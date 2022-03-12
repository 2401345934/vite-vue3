import { createRouter, createWebHashHistory, createWebHistory, } from 'vue-router'
// createWebHashHistory  hash 模式 带有# 号   无需后端

// createWebHistory   history 模式 不带有# 号  刷新时需要后端配合   在某个页面刷新 会以当前url  前往后端请求 需要nginx 做相应的配置 才不会出现 刷新404
const routes = [
  {
    path: '/',
    component: () => import('@/views/Home/index.vue'),
    children: [
      {
        path: '/todoList',
        name: 'TodoList',
        component: () => import('@/views/TodoList/index.vue'),
        meta: {
          title: 'TodoList'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),

  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  // 404
  if (to.matched.length === 0) {
    router.push('/404')
  }

})
export default router