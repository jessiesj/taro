<template>
  <div 
    class="tarot-card"
    :class="{ 'reversed': card.isReversed, 'flipping': isFlipping, 'visible': isVisible }"
  >
    <div class="card-inner">
      <!-- 卡牌正面 -->
      <div class="card-front">
        <div class="card-content">
          <div class="card-image">
            <!-- 这里使用占位图，实际项目中应该替换为真实的塔罗牌图片 -->
            <div class="card-placeholder" :style="{ backgroundColor: cardColor }">{{ card.name[0] }}</div>
          </div>
          <div class="card-info">
            <h3 class="card-name">{{ card.name }}</h3>
            <div class="card-position" v-if="showPosition">
              <span class="position-badge" :class="{ 'reversed': card.isReversed }">
                {{ card.isReversed ? '逆位' : '正位' }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 卡牌背面 -->
      <div class="card-back">
        <div class="card-back-design">
          <div class="tarot-symbol">🔮</div>
          <div class="tarot-text">塔罗牌</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TarotCard',
  props: {
    card: {
      type: Object,
      required: true
    },
    showPosition: {
      type: Boolean,
      default: true
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    isFlipping: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 根据卡牌ID生成不同的背景颜色，增加视觉多样性
    cardColor() {
      const colors = [
        '#ff9aa2', '#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea',
        '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#bbdefb',
        '#b3e5fc', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#dcedc8', '#f0f4c3'
      ]
      return colors[this.card.id % colors.length]
    }
  }
}
</script>

<style scoped>
.tarot-card {
  perspective: 1000px;
  width: 180px;
  height: 280px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.tarot-card:hover {
  transform: translateY(-5px);
}

.tarot-card.reversed {
  transform: rotate(180deg);
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-radius: 12px;
  overflow: hidden;
}

.tarot-card.flipping .card-inner {
  transform: rotateY(180deg);
}

.tarot-card:not(.visible) .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 12px;
}

.card-front {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border: 2px solid #e0e0e0;
}

.card-back {
  background: linear-gradient(135deg, #6a0dad 0%, #9370db 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
  border: 2px solid #7b1fa2;
}

.card-back-design {
  text-align: center;
}

.tarot-symbol {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.tarot-text {
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.card-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.card-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-info {
  text-align: center;
}

.card-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.card-position {
  display: inline-block;
}

.position-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  transition: background-color 0.3s ease;
}

.position-badge.reversed {
  background-color: #f44336;
}

/* 动画效果 */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.tarot-card.visible:not(.flipping) {
  animation: float 3s ease-in-out infinite;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tarot-card {
    width: 140px;
    height: 220px;
  }
  
  .card-placeholder {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }
  
  .card-name {
    font-size: 1rem;
  }
  
  .position-badge {
    padding: 3px 10px;
    font-size: 0.7rem;
  }
}
</style>