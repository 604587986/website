
import { login, getUserInfo, logout } from '@/api/user'
import { adminRouter, userRouter } from '@/config/router.config.js'
import Cookie from "js-cookie"

const user = {
    state: {
        user: null,
        site: null,
        group: null,
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
        // SET_STATUS(state, status) {
        //     state.status = status
        // }
        LOGOUT(state) {
            state.user = null
            state.site = null
            state.group = null
            Cookie.remove('QH_STATUS')
            Cookie.remove('mock_user')
            Cookie.remove('mock_site')
        }
    },
    getters: {
        addRouters(state) {
            if (state.group) {
                if (state.group.level === 0) {
                    return adminRouter
                } else {
                    return userRouter
                }
            } else {
                return []
            }

        },
        status(state) {
            if (state.user) {
                return true
            }
            return false;
        }

    },
    actions: {
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    if (res) {
                        Cookie.set("QH_STATUS", true, { expires: 1 })
                        resolve(res)
                    } else {
                        reject()
                    }

                })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(res => {
                    if (res) {
                        commit('LOGOUT')
                        resolve(res)
                    }

                })
            })
        },
        getUserInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    if (res) {
                        commit('SET_USER', res.data.user || null)
                        commit('SET_SITE', res.data.site || null)
                        commit('SET_GROUP', res.data.group || null)

                        resolve(res)
                    }

                })
            })

        }
    }
}
export default user