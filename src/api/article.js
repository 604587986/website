import request from '@/utils/request'

export function getArticleList(data) {
    return request('/article/index', {
        method: 'post',
        data: data
    })
}