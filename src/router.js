import Vue from 'vue'
import Router from 'vue-router'
import store from './store'


import login from './views/login'

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    ...store.state.permission.addRouters
  ]
})


router.beforeEach((to, form, next) => {
  next()
})



export default router