import Vue from 'vue'
import Router from 'vue-router'
import store from './store'


import login from './views/login'
import notFound from '@/views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/404',
      name: 'notFound',
      component: notFound
    },

  ]
})