import request from '@/utils/request'

export function getSiteList(data) {
    return request('/site/index', {
        method: 'post',
        data: data
    })
}