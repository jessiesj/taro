import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 配置GitHub Pages的基础路径，需要根据实际仓库名称修改
  // 如果仓库地址是 https://username.github.io/repo-name/
  // 则base应该设置为 '/repo-name/'
  base: '/', // 默认值，用户需要根据自己的仓库名称修改
})