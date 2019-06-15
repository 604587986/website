import Vue from 'vue'
import router from './router'
import store from './store'
import Cookie from "js-cookie"

import { adminRouter, userRouter } from '@/config/router.config.js'




const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
    if (Cookie.get('QH_STATUS')) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (!store.getters.status) {
                console.log(111)
                store.dispatch('getUserInfo').then(res => {
                    console.log(store.getters.addRouters)
                    router.addRoutes(store.getters.addRouters)
                    console.log('add success')
                    // next('/login')
                    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                })
            } else {
                console.log(222)
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login')
        }

    }

})

router.afterEach(() => {
})