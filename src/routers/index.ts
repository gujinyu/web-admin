import { createRouter, createWebHashHistory } from 'vue-router'
import SecurityLayout from '@/layout/SecurityLayout.vue'

import IndexLayout from '@/layout/IndexLayout/index.vue'
import IndexLayoutRoutes from '@/layout/IndexLayout/routes'

export const routes = [
  {
    title: 'empty',
    path: '/',
    component: SecurityLayout,
    children: [
      {
        title: 'empty',
        path: '/',
        redirect: '/home',
        component: IndexLayout,
        children: IndexLayoutRoutes,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as any,
})
export default router
