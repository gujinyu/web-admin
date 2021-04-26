import { RoutesDataItem } from '@/utils/routes'
import BlankLayout from '@/layout/BlankLayout.vue'

const IndexLayoutRoutes: Array<RoutesDataItem> = [
  {
    icon: 'home',
    title: '构建计划',
    path: '/home',
    redirect: '/home/workplace',
    component: BlankLayout,
    children: [
      {
        icon: 'control',
        title: '首页',
        path: 'workplace',
        component: () => import('@/views/home/index.vue'),
      },
      {
        icon: 'control',
        title: '首页1',
        path: 'workplace1',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    icon: 'home',
    title: '构建计划',
    path: '/home1',
    redirect: '/home1/workplace',
    component: BlankLayout,
    children: [
      {
        icon: 'control',
        title: '计划1',
        path: 'workplace',
        component: () => import('@/views/home/index.vue'),
      },
      {
        icon: 'control',
        title: '计划2',
        path: 'workplace1',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
]
export default IndexLayoutRoutes
