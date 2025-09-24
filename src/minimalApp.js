import { createApp } from 'vue'

// 创建一个最小的应用
const app = createApp({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #f8f0ff 0%, #e6d9ff 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #6a0dad;
    ">
      <h1 style="font-size: 3rem; margin-bottom: 1rem;">星绘之语</h1>
      <p style="font-size: 1.5rem;">塔罗牌占卜应用</p>
      <p style="margin-top: 2rem; color: #9370db;">应用已成功加载！</p>
    </div>
  `
})

// 挂载到DOM
app.mount('#app')