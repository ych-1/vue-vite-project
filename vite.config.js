import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 开发服务器选项
  server: {
    host: '0.0.0.0', // 设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    port: 3000, // 服务器端口
    open: true, // 打开浏览器
  },
})
