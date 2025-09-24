<template>
  <div class="fortune-container" :style="{ '--theme-color': config?.color || '#9370db' }">
    <div class="header">
      <h1 class="title">{{ config?.icon || '🔮' }} {{ config?.title || '塔罗牌占卜' }}</h1>
      <p class="subtitle">{{ config?.subtitle || '探索你的命运' }}</p>
      <button 
        class="back-button" 
        @click="goBack"
      >
        ← 返回主页
      </button>
    </div>
    
    <!-- 抽牌区域 -->
    <div class="drawing-area" v-if="!hasDrawn">
      <div class="instructions">
        <p>选择抽牌方式：</p>
        <div class="drawing-options">
          <label class="drawing-option">
            <input type="radio" v-model="drawingMode" value="auto" checked>
            <span>自动随机抽取</span>
          </label>
          <label class="drawing-option">
            <input type="radio" v-model="drawingMode" value="manual">
            <span>手动选择卡牌</span>
          </label>
        </div>
        <p class="note">三张卡牌分别代表你的过去、现在与未来</p>
      </div>
      
      <!-- 自动抽取按钮 -->
      <button 
        class="draw-button" 
        @click="drawingMode === 'auto' ? drawCards() : showManualSelection()"
        :disabled="isDrawing"
      >
        {{ isDrawing ? '抽取中...' : (drawingMode === 'auto' ? '自动抽取' : '开始手动选择') }}
      </button>
      
      <!-- 手动选择区域 -->
      <div class="manual-selection-area" v-if="isManualSelection">
        <p class="selection-step">请选择{{ selectedCards.length + 1 }}张牌</p>
        <div class="cards-pool">
          <div 
            class="card-option"
            v-for="card in availableCards" 
            :key="card.id"
            @click="selectCard(card)"
            :class="{ 'selected': selectedCards.some(c => c.id === card.id) }"
          >
            <div class="card-option-inner">
              {{ card.name }}
            </div>
          </div>
        </div>
        <button 
          class="confirm-selection-button"
          @click="confirmManualSelection"
          :disabled="selectedCards.length !== 3"
        >
          确认选择
        </button>
      </div>
    </div>
    
    <!-- 牌阵展示区域 -->
    <div class="cards-array" v-else>
      <div class="cards-row">
        <!-- 过去的牌 -->
        <div class="card-wrapper">
          <h3 class="card-time-label">过去</h3>
          <TarotCard 
            :card="cards[0]" 
            :is-visible="cards[0].isVisible"
            :is-flipping="cards[0].isFlipping"
          />
        </div>
        
        <!-- 现在的牌 -->
        <div class="card-wrapper">
          <h3 class="card-time-label">现在</h3>
          <TarotCard 
            :card="cards[1]" 
            :is-visible="cards[1].isVisible"
            :is-flipping="cards[1].isFlipping"
          />
        </div>
        
        <!-- 未来的牌 -->
        <div class="card-wrapper">
          <h3 class="card-time-label">未来</h3>
          <TarotCard 
            :card="cards[2]" 
            :is-visible="cards[2].isVisible"
            :is-flipping="cards[2].isFlipping"
          />
        </div>
      </div>
    </div>
    
    <!-- AI解读区域 -->
    <div class="reading-area" v-if="reading && hasDrawn && !isGeneratingReading">
      <div class="reading-container">
        <h2 class="reading-title">{{ reading.title }}</h2>
        
        <div class="reading-sections">
          <div class="reading-section">
            <h3 class="section-title">🌟 过去</h3>
            <p class="section-content">{{ reading.past }}</p>
          </div>
          
          <div class="reading-section">
            <h3 class="section-title">✨ 现在</h3>
            <p class="section-content">{{ reading.present }}</p>
          </div>
          
          <div class="reading-section">
            <h3 class="section-title">🔮 未来</h3>
            <p class="section-content">{{ reading.future }}</p>
          </div>
          
          <div class="reading-section conclusion">
            <p class="section-content">{{ reading.conclusion }}</p>
          </div>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="new-reading-button" @click="drawCards">
          重新抽取
        </button>
        <button class="back-home-button" @click="goBack">
          返回主页
        </button>
      </div>
    </div>
    
    <!-- 生成解读中 -->
    <div class="loading-area" v-if="isGeneratingReading">
      <div class="loading-spinner"></div>
      <p class="loading-text">正在连接AI解读师...</p>
      <p class="loading-subtext">正在获取你的专属解读...</p>
    </div>
  </div>
</template>

<script>
import TarotCard from '../components/TarotCard.vue'
import { getRandomCards, getFortuneTypeConfig, majorArcana } from '../data/tarotCards.js'
import { generateTarotReading } from '../utils/aiService.js'

export default {
  name: 'FortuneView',
  components: {
    TarotCard
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      config: null,
      cards: [],
      reading: null,
      hasDrawn: false,
      isDrawing: false,
      isGeneratingReading: false,
      drawingMode: 'auto', // 'auto' 或 'manual'
      isManualSelection: false,
      availableCards: [],
      selectedCards: [],
      tarotCards: majorArcana // 存储所有塔罗牌数据
    }
  },
  mounted() {
    // 初始化占卜类型配置
    this.config = getFortuneTypeConfig(this.type)
    // 确保配置不为空
    if (!this.config) {
      this.config = getFortuneTypeConfig('general')
    }
  },
  // 添加一个watch来监听type变化
  watch: {
    type: {
      handler(newType) {
        this.config = getFortuneTypeConfig(newType)
      },
      immediate: true
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    
    async drawCards() {
      // 重置状态
      this.hasDrawn = false
      this.cards = []
      this.reading = null
      this.isDrawing = true
      
      // 强制UI更新
      await this.$nextTick()
      
      // 获取随机卡牌
      const randomCards = getRandomCards()
      
      // 为每张卡牌添加动画状态
      this.cards = randomCards.map(card => ({
        ...card,
        isVisible: false,
        isFlipping: false
      }))
      
      // 小延迟确保UI有时间更新
      await new Promise(resolve => setTimeout(resolve, 100))
      
      this.hasDrawn = true
      
      // 执行抽牌动画（依次翻转每张牌）
      for (let i = 0; i < this.cards.length; i++) {
        // 延迟显示每张牌
        await new Promise(resolve => setTimeout(resolve, i * 1000))
        
        // 开始翻转
        this.cards[i].isFlipping = true
        
        // 翻转动画持续时间
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 完成翻转
        this.cards[i].isVisible = true
        this.cards[i].isFlipping = false
      }
      
      this.isDrawing = false
      
      // 开始生成AI解读
      await this.generateReading()
    },
    
    // 显示手动选择界面
    showManualSelection() {
      // 重置选择状态
      this.selectedCards = []
      
      // 准备所有可用的卡牌
      // 使用已经导入的tarotCards数据
      this.availableCards = this.tarotCards.map(card => ({
        ...card,
        isReversed: Math.random() < 0.3
      }))
      this.isManualSelection = true
    },
    
    // 选择卡牌
    selectCard(card) {
      // 检查是否已经选择了这张牌
      const isAlreadySelected = this.selectedCards.some(c => c.id === card.id)
      
      if (isAlreadySelected) {
        // 如果已经选择，则移除
        this.selectedCards = this.selectedCards.filter(c => c.id !== card.id)
      } else if (this.selectedCards.length < 3) {
        // 如果未满3张，则添加
        this.selectedCards.push(card)
      }
    },
    
    // 确认手动选择
    async confirmManualSelection() {
      if (this.selectedCards.length !== 3) {
        return
      }
      
      this.isDrawing = true
      this.isManualSelection = false
      
      // 为每张卡牌添加动画状态
      this.cards = this.selectedCards.map(card => ({
        ...card,
        isVisible: false,
        isFlipping: false
      }))
      
      // 小延迟确保UI有时间更新
      await new Promise(resolve => setTimeout(resolve, 100))
      
      this.hasDrawn = true
      
      // 执行抽牌动画（依次翻转每张牌）
      for (let i = 0; i < this.cards.length; i++) {
        // 延迟显示每张牌
        await new Promise(resolve => setTimeout(resolve, i * 1000))
        
        // 开始翻转
        this.cards[i].isFlipping = true
        
        // 翻转动画持续时间
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 完成翻转
        this.cards[i].isVisible = true
        this.cards[i].isFlipping = false
      }
      
      this.isDrawing = false
      
      // 开始生成AI解读
      await this.generateReading()
    },
    
    async generateReading() {
      this.isGeneratingReading = true
      
      try {
        // 调用AI服务生成解读
        this.reading = await generateTarotReading(this.cards, this.type, this.config)
      } catch (error) {
        console.error('生成解读失败:', error)
        // 显示错误信息
        this.reading = {
          title: '解读生成失败',
          past: '抱歉，暂时无法生成过去的解读。',
          present: '请稍后再试，或重新抽取牌阵。',
          future: '感谢您的理解与支持。',
          conclusion: '✨',
          style: 'general'
        }
      } finally {
        this.isGeneratingReading = false
      }
    }
  }
}
</script>

<style scoped>
.fortune-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f0ff 0%, #e6d9ff 100%);
  background-attachment: fixed;
  position: relative;
}

.fortune-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(173, 127, 255, 0.1) 0%, rgba(173, 127, 255, 0) 70%);
  pointer-events: none;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.back-button {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #6a0dad;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) translateX(-5px);
  box-shadow: 0 4px 12px rgba(173, 127, 255, 0.2);
}

.title {
  font-size: 2.5rem;
  color: var(--theme-color);
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 0px rgba(173, 127, 255, 0.3);
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  color: #9370db;
  font-weight: 300;
}

/* 抽牌区域样式 */
.drawing-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 2rem;
}

.instructions {
  margin-bottom: 2rem;
}

.instructions p {
  font-size: 1.2rem;
  color: #6a0dad;
  margin-bottom: 0.5rem;
}

.drawing-options {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  justify-content: center;
}

.drawing-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  color: #6a0dad;
}

.drawing-option input[type="radio"] {
  accent-color: var(--theme-color);
}

.note {
  font-size: 1rem !important;
  color: #9370db !important;
  font-style: italic;
  margin-top: 1rem;
}

.draw-button {
  background: linear-gradient(135deg, var(--theme-color) 0%, #9370db 100%);
  border: none;
  color: white;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(173, 127, 255, 0.3);
  position: relative;
  overflow: hidden;
}

/* 手动选择区域样式 */
.manual-selection-area {
  margin-top: 2rem;
  width: 100%;
}

.selection-step {
  font-size: 1.1rem;
  color: #6a0dad;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.cards-pool {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
}

.card-option {
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.card-option:hover {
  transform: translateY(-3px);
  border-color: var(--theme-color);
}

.card-option.selected {
  border-color: var(--theme-color);
  background: rgba(173, 127, 255, 0.1);
}

.card-option-inner {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  color: #6a0dad;
  box-shadow: 0 4px 10px rgba(173, 127, 255, 0.1);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-selection-button {
  background: linear-gradient(135deg, var(--theme-color) 0%, #9370db 100%);
  border: none;
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(173, 127, 255, 0.2);
  margin-top: 1rem;
}

.confirm-selection-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(173, 127, 255, 0.3);
}

.confirm-selection-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 10px rgba(173, 127, 255, 0.1);
}

.draw-button:before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  transform: rotate(30deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.draw-button:hover:before {
  opacity: 1;
}

.draw-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(173, 127, 255, 0.4);
}

.draw-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* 牌阵展示区域样式 */
.cards-array {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cards-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-time-label {
  font-size: 1.2rem;
  color: #6a0dad;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 0px rgba(173, 127, 255, 0.2);
}

/* 解读区域样式 */
.reading-area {
  margin-top: 3rem;
  width: 100%;
  max-width: 800px;
  align-self: center;
}

.reading-container {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(173, 127, 255, 0.2);
  border: 1px solid rgba(173, 127, 255, 0.3);
}

.reading-title {
  font-size: 1.8rem;
  color: var(--theme-color);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
}

.reading-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reading-section {
  background: rgba(173, 127, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid var(--theme-color);
}

.section-title {
  font-size: 1.2rem;
  color: #6a0dad;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.section-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}

.reading-section.conclusion {
  background: linear-gradient(135deg, rgba(173, 127, 255, 0.1) 0%, rgba(173, 127, 255, 0.05) 100%);
  border-left: none;
  text-align: center;
  font-style: italic;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.new-reading-button,
.back-home-button {
  background: white;
  border: 2px solid var(--theme-color);
  color: var(--theme-color);
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.new-reading-button:hover,
.back-home-button:hover {
  background: var(--theme-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(173, 127, 255, 0.3);
}

/* 加载状态样式 */
.loading-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(173, 127, 255, 0.2);
  border-top: 6px solid var(--theme-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

.loading-text {
  font-size: 1.2rem;
  color: #6a0dad;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.loading-subtext {
  font-size: 1rem;
  color: #9370db;
  font-style: italic;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .back-button {
    position: static;
    transform: none;
    margin-bottom: 1rem;
  }
  
  .back-button:hover {
    transform: translateX(-5px);
  }
  
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .cards-row {
    gap: 1rem;
  }
  
  .reading-container {
    padding: 1.5rem;
  }
  
  .reading-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .new-reading-button,
  .back-home-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>