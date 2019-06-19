import request from '@/utils/request'

export function getSiteList(data) {
    return request('/site/index', {
        method: 'post',
        data: data
    })
}
export function createSite(data) {
    return request('/site/create', {
        method: 'post',
        data: data
    })

}
export function editSite(data) {
    return request('/site/info', {
        method: 'post',
        data: data
    })
}
export function saveSite(data) {
    return request('/site/save', {
        method: 'post',
        data: data
    })
}
export function deleteSite(data) {
    return request('/site/delete', {
        method: 'post',
        data: data
    })
}