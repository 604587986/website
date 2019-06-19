import request from '@/utils/request'

export function getTagList(data) {
    return request('/tag/index', {
        method: 'post',
        data: data
    })
}
export function createTag(data) {
    return request('/tag/create', {
        method: 'post',
        data: data
    })

}
export function editTag(data) {
    return request('/tag/edit', {
        method: 'post',
        data: data
    })
}
export function saveTag(data) {
    return request('/tag/save', {
        method: 'post',
        data: data
    })
}
export function deleteTag(data) {
    return request('/tag/delete', {
        method: 'post',
        data: data
    })
}