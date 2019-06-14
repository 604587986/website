
import { login } from '@/api/user'
import { adminRouter, userRouter } from '@/config/router.config.js'

const user = {
    state: {
        user: {},
        site:{},
        group: {},
        addRouters: []
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_SITE(state, site) {
            state.site = site
        },
        SET_GROUP(state, group) {
            state.group = group
        },
    },
    getters: {
        addRouters(state) {
            if (state.group.level === 0) {
                return adminRouter
            }else{
                return userRouter
            }
        }

    },
    actions: {
        login({ commit }, data) {
            login(data).then(res => {
                commit('SET_USER', res.data.user || {})
                commit('SET_SITE', res.data.site || {})
                commit('SET_GROUP', res.data.group || {})
            })
        }
    }
}
export default user