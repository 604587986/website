
import { getMonitorList } from '@/api/monitor'


const monitor = {
    state: {
        list: [],
        loading: false,
        pagination: {
            current: 1,
            pageSize: 10,
            showTotal: total => {
                return `共${total}条`;
            }
        }
    },
    mutations: {
        SET_LIST(state, list) {
            state.list = list
        },
        SET_PAGINATION(state, pagination) {
            state.pagination = {
                ...state.pagination, ...pagination
            }
        },
        SET_LOADING(state, loading) {
            state.loading = loading
        }
    },
    actions: {
        getMonitorList({ commit, state }, data) {
            commit('SET_LOADING', true)
            const pager = {
                page: state.pagination.current,
                size: state.pagination.pageSize
            };


            const ajaxData = { ...data, ...pager }

            getMonitorList(ajaxData).then(res => {
                commit('SET_LOADING', false)
                commit('SET_LIST', res.data.list)
                commit('SET_PAGINATION', {
                    current: res.data.page.page,
                    pageSize: res.data.page.size,
                    total: res.data.count,
                })
            })
        }
    }
}
export default monitor