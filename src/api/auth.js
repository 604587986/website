import request from '@/utils/request'

export function getUserList(data) {
    return request('/user/index', {
        method: 'post',
        data: data
    })
}