import request from '@/utils/request'

export function getPageList(data) {
    return request('/page/index', {
        method: 'post',
        data: data
    })
}