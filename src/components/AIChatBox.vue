<template>
  <div class="ai-chat-box">
    <div class="chat-header">
      <div class="chat-icon">🤖</div>
      <h3 class="chat-title">AI解读助手</h3>
      <button class="chat-toggle" @click="toggleChat">
        {{ isExpanded ? '收起' : '展开' }}
      </button>
    </div>
    
    <div class="chat-content" v-if="isExpanded">
      <div class="chat-messages" ref="chatMessages">
        <!-- 系统消息 -->
        <div class="message system-message" v-if="messages.length === 0">
          <div class="message-content">
            <p>我是您的AI解读助手，可以为您深入解析塔罗牌的含义。</p>
            <p>您可以问我关于本次解读的任何问题，或者提供更多细节让我为您提供更个性化的建议。</p>
          </div>
        </div>
        
        <!-- 用户和AI消息 -->
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          :class="['message', message.type === 'user' ? 'user-message' : 'ai-message']"
        >
          <div class="message-avatar">{{ message.type === 'user' ? '👤' : '🤖' }}</div>
          <div class="message-content">
            <p>{{ message.content }}</p>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div class="message ai-message" v-if="isThinking">
          <div class="message-avatar">🤖</div>
          <div class="message-content thinking">
            <div class="typing-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input-container">
        <textarea
          v-model="userInput"
          class="chat-input"
          placeholder="输入您的问题..."
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.enter.shift="$event.target.value += '\n'"
          :disabled="isThinking"
          rows="1"
          maxlength="500"
        ></textarea>
        <button 
          class="send-button"
          @click="sendMessage"
          :disabled="isThinking || !userInput.trim()"
        >
          发送
        </button>
      </div>
    </div>
    
    <!-- 未展开状态的提示 -->
    <div class="chat-preview" v-else>
      <p>有更多问题？点击展开对话框深入探讨...</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
// 根据环境配置决定使用模拟回答还是真实API回答
import { generateChatResponse as mockChatResponse } from '../utils/chatService.js'
import { generateChatResponse as apiChatResponse } from '../utils/chatServiceWithApi.js'

// 从环境变量获取API模式配置
const apiMode = import.meta.env.VITE_API_MODE || 'mock'

// 选择使用的聊天服务
const generateChatResponse = apiMode === 'api' ? apiChatResponse : mockChatResponse

export default {
  name: 'AIChatBox',
  props: {
    reading: {
      type: Object,
      required: true
    },
    cards: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const isExpanded = ref(false)
    const userInput = ref('')
    const messages = ref([])
    const isThinking = ref(false)
    const chatMessages = ref(null)
    
    const toggleChat = () => {
      isExpanded.value = !isExpanded.value
      
      // 展开时滚动到底部
      if (isExpanded.value) {
        nextTick(() => {
          scrollToBottom()
        })
      }
    }
    
    const scrollToBottom = () => {
      if (chatMessages.value) {
        chatMessages.value.scrollTop = chatMessages.value.scrollHeight
      }
    }
    
    const sendMessage = async () => {
      const message = userInput.value.trim()
      if (!message || isThinking.value) return
      
      // 添加用户消息
      messages.value.push({
        type: 'user',
        content: message
      })
      
      userInput.value = ''
      isThinking.value = true
      
      // 滚动到底部
      await nextTick()
      scrollToBottom()
      
      try {
        // 模拟AI回复（在实际应用中应该调用真实的API）
        const response = await generateChatResponse(
          message, 
          props.reading, 
          props.cards
        )
        
        // 添加AI回复
        messages.value.push({
          type: 'ai',
          content: response
        })
      } catch (error) {
        // 错误处理
        messages.value.push({
          type: 'ai',
          content: '抱歉，我暂时无法回答您的问题。请稍后再试。'
        })
      } finally {
        isThinking.value = false
        
        // 滚动到底部
        await nextTick()
        scrollToBottom()
      }
    }
    
    // 监听解读内容变化，重置聊天历史
    watch(() => props.reading, () => {
      messages.value = []
    }, { deep: true })
    
    return {
      isExpanded,
      userInput,
      messages,
      isThinking,
      chatMessages,
      toggleChat,
      sendMessage
    }
  }
}
</script>

<style scoped>
.ai-chat-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(200, 200, 255, 0.3);
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.chat-header:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.chat-icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
}

.chat-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.chat-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.3s ease;
}

.chat-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chat-content {
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 400px;
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

.message {
  display: flex;
  margin-bottom: 1rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-avatar {
  font-size: 1.2rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  line-height: 1.5;
}

.system-message .message-content {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  color: #4a5568;
}

.user-message {
  flex-direction: row-reverse;
}

.user-message .message-avatar {
  margin-right: 0;
  margin-left: 0.75rem;
}

.user-message .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.ai-message .message-content {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  color: #2d3748;
}

.thinking {
  min-height: 40px;
  display: flex;
  align-items: center;
}

.typing-indicator {
  display: flex;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #999;
  border-radius: 50%;
  margin: 0 2px;
  animation: typing 1.4s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-5px);
  }
}

.chat-input-container {
  display: flex;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  gap: 0.75rem;
  background: white;
}

.chat-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  resize: none;
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.4;
  transition: border-color 0.3s ease;
}

.chat-input:focus {
  outline: none;
  border-color: #667eea;
}

.chat-input:disabled {
  background: #f7fafc;
  cursor: not-allowed;
}

.send-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.send-button:active:not(:disabled) {
  transform: translateY(0);
}

.send-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.chat-preview {
  padding: 1rem 1.5rem;
  text-align: center;
  color: #718096;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.chat-preview:hover {
  background: rgba(0, 0, 0, 0.02);
}
</style>