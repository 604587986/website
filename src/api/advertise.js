import request from '@/utils/request'

export function getList(data) {
    return request('/advertise/index', {
        method: 'post',
        data: data
    })
}
export function getCategory(data) {
    return request('/gallery_category/index', {
        method: 'post',
        data: { ...data, type: 3 }
    })
}
