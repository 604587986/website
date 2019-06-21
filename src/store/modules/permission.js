//本文件主要用来过滤普通用户的菜单

import { adminRouter, userRouter } from '@/config/router.config.js'


function hasRole(roles, route) {
    if (route.meta && route.meta.roles) {
        let flag = -1
        flag = route.meta.roles.indexOf(roles)
        if (flag >= 0) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

function filterAsyncRouter(routerMap, roles) {
    const accessedRouters = routerMap.filter(route => {
        console.log(hasRole(roles, route));
        
        if (hasRole(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}


const permission = {
    state: {
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
        },
    },
    actions: {
        GenerateRoutes({ commit }, roles) {
            return new Promise(resolve => {
                let accessedRouters
                // 如果是系统管理员
                if (roles === 0) {
                    accessedRouters = adminRouter
                    commit('SET_ROUTERS', accessedRouters)
                }
                // 如果是普通管理员
                else {
                    accessedRouters = filterAsyncRouter(userRouter, roles)
                    commit('SET_ROUTERS', accessedRouters)
                }
                resolve()
            })
        }
    }
}
export default permission