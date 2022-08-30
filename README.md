# vue-admin

<br/>

## 1、状态管理 Pinia

Pinia 官方中文文档：[https://pinia.web3doc.top/](https://pinia.web3doc.top/)

- 安装命令
  ```
  pnpm i pinia
  ```

- 在 src 目录下创建 store/index.js
  ```javascript
  import { createPinia, defineStore } from 'pinia'
  
  const store = createPinia()
  
  export const useStore = defineStore('index', {
    state: () => ({
      count: 1
    }),
    getters: {
      doubleCount: (state) => state.counter * 2
    },
    actions: {
      increment() {
        this.counter++
      }
    }
  })
  
  export default store
  ```

- main.js 修改
  ```javascript
  import { createApp } from 'vue'
  import App from './App.vue'
  
  // 导入状态管理
  import store from './store'
  
  // Vue 实例
  const app = createApp(App)
  
  // 使用状态管理
  app.use(store)
  
  // 挂载
  app.mount('#app')
  ```

- components/HelloWorld.vue 修改
  ```html_ruby
  <template>
    <h1>{{ msg }}</h1>
    <h2>count is: {{ count }}</h2>
    <h2>doubleCount is: {{ doubleCount }}</h2>
    <button type="button" @click="handleIncrement">count++</button>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia'
  import { useStore } from '../store'
  
  defineProps({
    msg: {
      type: String,
      default: 'Hello World!!!'
    }
  })
  
  const store = useStore()
  
  const { count, doubleCount } = storeToRefs(store)
  
  const handleIncrement = () => {
    store.increment()
  }
  </script>
  
  <style scoped></style>
  ```

- vite 配置：修改 vite.config.js 配置文件
  ```javascript
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import path from 'path'
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [vue()],
    resolve: {
      // 别名配置
      alias: {
        '@/': path.resolve(__dirname, 'src/*')
      }
    },
    // 开发服务器选项
    server: {
      host: '0.0.0.0', // 设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      port: 3000, // 服务器端口
      open: true // 打开浏览器
    }
  })
  ```

- 配置后效果展示：
  
  ![截图](d06d0c47a745f3c2936a1813e88db468.png)

<br/>

## 2、路由 vue-router

Vue Router 官方中文文档：[https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

- 安装命令
  ```
  pnpm install vue-router@4
  ```

- 修改 App.vue 文件
  ```html_ruby
  <template>
    <router-view />
  </template>
  ```

- 在 src 目录下新建 router/index.js
  ```javascript
  import { createRouter, createWebHistory } from 'vue-router'
  
  const HelloWorld = () => import('../components/HelloWorld.vue')
  const About = { template: '<div>About</div>' }
  const User = {
    template: `
  		<div>
  			<h2>User {{ $route.params.id }}</h2>
  			<router-view></router-view>
  		</div>`
  }
  
  const routes = [
    { path: '/', component: HelloWorld },
    { path: '/about', component: About },
    { path: '/users/:id', component: User }
  ]
  
  const router = createRouter({
    // createWebHashHistory (hash路由 Hash模式 #)
    // createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
    // createMemoryHistory 带缓存 history 路由
    history: createWebHistory(),
    routes
  })
  
  export default router
  ```

- main.js 修改
  ```javascript
  import { createApp } from 'vue'
  import App from './App.vue'
  
  // 导入状态管理
  import store from './store'
  // 导入路由
  import router from './router'
  
  // Vue 实例
  const app = createApp(App)
  
  // 使用状态管理
  app.use(store)
  // 使用路由
  app.use(router)
  
  // 挂载
  app.mount('#app')
  ```