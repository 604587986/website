//本文件主要用来过滤普通用户的菜单,系统管理员暂不用过滤
/*
    0:系统管理员
    1：主站管理员
    2：分站管理员
    3：领导
    4：编辑
    5：实习编辑
*/
import { adminRouter, userRouter } from '@/config/router.config.js'


//判断某个路由用户是否有权限，如果路由存在meta.roles，且不包含用户的group，则不生成此路由，否则生成
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
//过滤路由，使用hasRole方法过滤
function filterAsyncRouter(routerMap, roles) {
    const accessedRouters = routerMap.filter(route => {
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