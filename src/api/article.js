import request from '@/utils/request'

//文章列表
export function getArticleList(data) {
    return request('/article/index', {
        method: 'post',
        data: data
    })
}
//文章预创建
export function create(data) {
    return request('/article/create', {
        method: 'post',
        data: data
    })
}
//文章审核
export function verify(data) {
    return request('/article/verify', {
        method: 'post',
        data: data
    })
}