import Vue from 'vue'
import Router from 'vue-router'
import store from './store'


import login from './views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})