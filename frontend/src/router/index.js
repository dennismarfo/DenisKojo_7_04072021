import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {  requireAuth: true },

    
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
  },
  {
    path: '/updatePost/:postId',
    name: 'UpdatePost',
    meta: { requireAuth: true },
    component: () => import ('../views/UpdatePost.vue'),
    props: true
  }

  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
