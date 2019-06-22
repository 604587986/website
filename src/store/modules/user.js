
import { login, getUserInfo, logout, getManagedSite } from '@/api/user'
import { adminRouter, userRouter } from '@/config/router.config.js'
import Cookie from "js-cookie"

const user = {
    state: {
        user: null,
        site: null,
        group: null,
        init: null,
        siteList: []
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
        SET_INIT(state, init) {
            state.init = init
        },
        SET_SITE_LIST(state, list) {
            state.siteList = list
        },
        LOGOUT(state) {
            state.user = null
            state.site = null
            state.group = null
            state.init = null
            Cookie.remove('QH_STATUS')
            Cookie.remove('mock_user')
            Cookie.remove('mock_site')
        }
    },
    actions: {
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    if (res.data.site && res.data.site.length) {
                        commit('SET_SITE_LIST', res.data.site)
                    }
                    //将登录逻辑交于组件操作
                    resolve(res)

                }).catch(err => {
                    reject()
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
        getUserInfo({ commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    if (res) {
                        commit('SET_USER', res.data.user || null)
                        commit('SET_SITE', res.data.site || null)
                        commit('SET_GROUP', res.data.group || null)
                        commit('SET_INIT', res.data.init || null)

                        dispatch('getManagedSite')

                        resolve(res)
                    }

                })
            })

        },
        getManagedSite({ commit }) {
            return new Promise((resolve, reject) => {
                getManagedSite().then(res => {
                    if (res) {
                        commit('SET_SITE_LIST', res.data.list)
                        resolve(res)
                    }
                })
            })
        }
    }
}
export default user