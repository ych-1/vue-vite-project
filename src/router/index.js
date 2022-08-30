import { createRouter, createWebHistory } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录页', hidden: true },
  },
  {
    path: '/404',
    name: '404',
    component: { template: '<div>404页面</div>' },
    meta: { title: '404', hidden: true },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'PieChartOutlined' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
