import { createRouter, createWebHashHistory } from 'vue-router'
// createWebHashHistory  hash 模式 带有# 号   无需后端
import { multiTab, RouterListType } from '@/piniaStore/module/multiTab'

export type RouterType = {
  path: string
  component?: any
  redirect?: string
  name?: string
  meta?: {
    title: string
    keepAlive?: boolean
  }
  children?: RouterType[]
}

// createWebHistory   history 模式 不带有# 号  刷新时需要后端配合   在某个页面刷新 会以当前url  前往后端请求 需要nginx 做相应的配置 才不会出现 刷新404
const routes: RouterType[] = [
  {
    path: '/',
    component: () => import('@/components/BaseLayout/index.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: '/class-manage',
        meta: { title: '活动管理', keepAlive: true },
        component: () => import('@/components/ChilrenComponent/index.vue'),
        children: [
          {
            path: '/class-manage/course-category',
            name: 'course-category',
            component: () =>
              import('@/views/class-manage/course-category/index.vue'),
            meta: { title: '活动类别管理', keepAlive: true }
          },
          {
            path: '/class-manage/class-list',
            name: 'class-list',
            component: () =>
              import('@/views/class-manage/class-list/index.vue'),
            meta: { title: '活动列表', keepAlive: true }
          }
        ]
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  // 404
  // 卸载缓存
  const multiTabStore = multiTab()
  // 判断当前页面是否要缓存
  to.meta.keepAlive = multiTabStore.$state.routerList.find(
    (d: RouterListType) => d.path === to.path
  )
  if (to.matched.length === 0) {
    router.push('/404')
  }
})

router.afterEach((to, from) => {
  // ...
  // if (to.path !== '/login' && (!userInfo.userName || !userInfo.passWord)) {
  //   message.error('当前没有登录 请登录')
  //   router.push('/login')
  // }
})
export default router
