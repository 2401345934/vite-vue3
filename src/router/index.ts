import { createRouter, createWebHashHistory, } from 'vue-router'
// createWebHashHistory  hash 模式 带有# 号   无需后端
import { ElMessage } from 'element-plus'
import store from "@/store"


type RouterType = {
  path: string,
  component: any,
  redirect?: string,
  name?: string,
  meta?: {
    title: string
  },
  children?: RouterType[]
}

// createWebHistory   history 模式 不带有# 号  刷新时需要后端配合   在某个页面刷新 会以当前url  前往后端请求 需要nginx 做相应的配置 才不会出现 刷新404
const routes: RouterType = [
  {
    path: '/',
    component: () => import("@/views/Home/index.vue"),
    redirect: "/welcome",
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/yewu',
        name: 'Yewu',
        meta: {
          title: '业务测试'
        },
        component: () => import('@/views/ChilrenComponent/index.vue'),
        children: [
          {
            path: '/yewu/todoListVux',
            name: 'TodoListVux',
            component: () => import('@/views/TodoListVux/index.vue'),
            meta: {
              title: '待办事项-Vux'
            }
          },
          {
            path: '/yewu/todoListPinia',
            name: 'TodoListPinia',
            component: () => import('@/views/TodoListPinia/index.vue'),
            meta: {
              title: '待办事项-Pinia'
            }
          },
          {
            path: '/yewu/cart',
            name: 'Cart',
            component: () => import('@/views/Cart/index.vue'),
            meta: {
              title: '购物车'
            }
          },

        ]
      },
      {
        path: '/queryTable',
        name: 'QueryTable',
        component: () => import('@/views/QueryTable/index.vue'),
        meta: {
          title: '查询列表'
        }
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/Test/index.vue'),
        meta: {
          title: '测试'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
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

router.afterEach((to, from) => {
  // ...
  const userInfo = store.getters['userInfo/get']
  if (to.path !== '/login' && (!userInfo.userName || !userInfo.passWord)) {
    ElMessage({
      message: '当前没有登录 请登录',
      type: 'error',
    })
    router.push('/login')
  }


})
export default router