import { createApp } from 'vue'
import App from './App.vue'

// 导入状态管理
import store from './store'
// 导入路由
import router from './router'

// 样式文件
import './styles/index.css'

// Vue 实例
const app = createApp(App)

// 使用状态管理
app.use(store)
// 使用路由
app.use(router)

// 挂载
app.mount('#app')
