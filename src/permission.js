import Vue from 'vue'
import router from './router'
import store from './store'
import Cookie from "js-cookie"
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // progress bar style

import { adminRouter, userRouter } from '@/config/router.config.js'




const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar

    if (Cookie.get('QH_STATUS')) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (!store.getters.status) {
                store.dispatch('getUserInfo').then(res => {
                    store.dispatch('GenerateRoutes', store.getters.group).then(() => {
                        router.addRoutes(store.getters.addRouters)
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login')
            NProgress.done();
        }

    }

})

router.afterEach(() => {
    NProgress.done(); // finish progress bar
})