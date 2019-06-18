import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import monitor from './modules/monitor'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        permission,
        user,
        monitor
    },
    state: {

    },
    mutations: {

    },
    actions: {

    }
})
