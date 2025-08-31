import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/',
          component: () => import('../views/IndexView.vue'),
        },
        {
          path: '/userinfo',
          component: () => import('../views/UserInfoView.vue'),
        },
        {
          path: '/fundList',
          component: () => import('../views/FundListView.vue'),
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/404.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false
  if (to.path === '/login' || to.path === '/register') {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isLogin ? next('/') : next()
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isLogin ? next() : next('/login')
  }
})

export default router
