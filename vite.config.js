import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 配置GitHub Pages的基础路径，已经根据实际仓库名称修改
  // 仓库地址是 https://jessiesj.github.io/taro/
  // 所以base设置为 '/taro/'
  base: '/taro/',
})