import request from '@/utils/request'

export function getArticleList(data) {
    return request('/article/index', {
        method: 'post',
        data: data
    })
}
export function create(data) {
    return request('/article/create', {
        method: 'post',
        data: data
    })
}