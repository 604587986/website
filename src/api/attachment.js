import request from '@/utils/request'

export function getList(data) {
    return request('/attachment/index', {
        method: 'post',
        data: data
    })
}