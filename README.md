# vue+vite+pinia 项目初始化

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
      count: 1,
    }),
    getters: {
      doubleCount: (state) => state.counter * 2,
    },
    actions: {
      increment() {
        this.counter++
      },
    },
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
        '@/': path.resolve(__dirname, 'src/*'),
      },
    },
    // 开发服务器选项
    server: {
      host: '0.0.0.0', // 设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      port: 3000, // 服务器端口
      open: true, // 打开浏览器
    },
  })
  ```
  
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
  		</div>`,
  }

  const routes = [
    { path: '/', component: HelloWorld },
    { path: '/about', component: About },
    { path: '/users/:id', component: User },
  ]

  const router = createRouter({
    // createWebHashHistory (hash路由 Hash模式 #)
    // createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
    // createMemoryHistory 带缓存 history 路由
    history: createWebHistory(),
    routes,
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

## 3、样式文件，重置样式

- 创建文件 src/styles/index.css

  ```css
  @import 'normalize.css';
  @import 'variables.css';
  ```

- 创建文件 src/styles/normalize.css

  ```
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

  /* Document
     ========================================================================== */

  /**
   * 1. Correct the line height in all browsers.
   * 2. Prevent adjustments of font size after orientation changes in iOS.
   */

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /* Sections
     ========================================================================== */

  /**
   * Remove the margin in all browsers.
   */

  body {
    margin: 0;
  }

  /**
   * Render the `main` element consistently in IE.
   */

  main {
    display: block;
  }

  /**
   * Correct the font size and margin on `h1` elements within `section` and
   * `article` contexts in Chrome, Firefox, and Safari.
   */

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  /* Grouping content
     ========================================================================== */

  /**
   * 1. Add the correct box sizing in Firefox.
   * 2. Show the overflow in Edge and IE.
   */

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd `em` font sizing in all browsers.
   */

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /* Text-level semantics
     ========================================================================== */

  /**
   * Remove the gray background on active links in IE 10.
   */

  a {
    background-color: transparent;
  }

  /**
   * 1. Remove the bottom border in Chrome 57-
   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
   */

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  /**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */

  b,
  strong {
    font-weight: bolder;
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd `em` font sizing in all browsers.
   */

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
   * Add the correct font size in all browsers.
   */

  small {
    font-size: 80%;
  }

  /**
   * Prevent `sub` and `sup` elements from affecting the line height in
   * all browsers.
   */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /* Embedded content
     ========================================================================== */

  /**
   * Remove the border on images inside links in IE 10.
   */

  img {
    border-style: none;
  }

  /* Forms
     ========================================================================== */

  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */

  button,
  input {
    /* 1 */
    overflow: visible;
  }

  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**
   * Correct the inability to style clickable types in iOS and Safari.
   */

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  /**
   * Remove the inner border and padding in Firefox.
   */

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
   * Restore the focus styles unset by the previous rule.
   */

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
   * Correct the padding in Firefox.
   */

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  /**
   * 1. Correct the text wrapping in Edge and IE.
   * 2. Correct the color inheritance from `fieldset` elements in IE.
   * 3. Remove the padding so developers are not caught out when they zero out
   *    `fieldset` elements in all browsers.
   */

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  /**
   * Add the correct vertical alignment in Chrome, Firefox, and Opera.
   */

  progress {
    vertical-align: baseline;
  }

  /**
   * Remove the default vertical scrollbar in IE 10+.
   */

  textarea {
    overflow: auto;
  }

  /**
   * 1. Add the correct box sizing in IE 10.
   * 2. Remove the padding in IE 10.
   */

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
   * Correct the cursor style of increment and decrement buttons in Chrome.
   */

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  /**
   * 1. Correct the odd appearance in Chrome and Safari.
   * 2. Correct the outline style in Safari.
   */

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
   * Remove the inner padding in Chrome and Safari on macOS.
   */

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to `inherit` in Safari.
   */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /* Interactive
     ========================================================================== */

  /*
   * Add the correct display in Edge, IE 10+, and Firefox.
   */

  details {
    display: block;
  }

  /*
   * Add the correct display in all browsers.
   */

  summary {
    display: list-item;
  }

  /* Misc
     ========================================================================== */

  /**
   * Add the correct display in IE 10+.
   */

  template {
    display: none;
  }

  /**
   * Add the correct display in IE 10.
   */

  [hidden] {
    display: none;
  }
  ```

- 自定义变量 src/styles/variables.css

  ```css
  :root {
    --primaryColor: #316c72;
  }
  ```

- main.js 引入

  ```javascript
  import './styles/index.css'
  ```

- 使用变量
  ```css
  h1 {
    color: var(--primaryColor);
  }
  ```

## 4、代码格式化 eslint + prettier

eslint 官方中文文档：[https://eslint.cn/](https://eslint.cn/)

- 安装命令

  `eslint-plugin-prettier` `eslint-config-prettier` 解决 eslint 和 prettier 冲突。

  ```
  pnpm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier
  ```

- 初始化 eslint

  ```
  npx eslint --init
  ```

- .eslintrc.js

  ```javascript
  module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
      'vue/valid-template-root': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index'],
        },
      ],
    },
  }
  ```

- .prettierrc.js
  ```javascript
  module.exports = {
    printWidth: 80, // 行代码的最大字符数
    useTabs: false, // 是否使用tab来缩进
    tabWidth: 2, // tab宽度为2空格
    semi: false, // 结尾是否添加分号
    singleQuote: true, // 使用单引号
    endOfLine: 'lf', // 行尾换行符
  }
  ```

## 5、axios 封装

axios 官方中文文档：[https://www.axios-http.cn/](https://www.axios-http.cn/)

- 安装命令：

  ```
  pnpm i -D axios
  ```

- 创建文件 src/utils/request.js

  ```javascript
  import axios from 'axios'

  // axios 实例
  const service = axios.create({
    baseURL: '/',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar' },
  })

  // 添加请求拦截器
  service.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  service.interceptors.response.use(
    function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )

  export default service
  ```

- 使用 api/user.js

  ```javascript
  import request from '@/utils/request'

  export function login(data) {
    return request({
      url: 'user/login',
      method: 'post',
      data,
    })
  }
  ```

## jsconfig.json

```javascript
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "jsx": "preserve"
  },
  "exclude": ["node_modules", "dist"]
}
```
