import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 使用hash路由模式，不需要特殊的base配置
  base: '/',
})