import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 使用相对路径构建，确保在GitHub Pages上正确加载资源
  base: './',
})