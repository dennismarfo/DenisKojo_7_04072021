import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    },
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/account',
    name: 'Account',
    meta: { requireAuth: true },
    component: () => import('../views/Account.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
