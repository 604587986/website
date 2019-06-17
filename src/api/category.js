import request from '@/utils/request'

export function getCategoryList(data) {
    return request('/category/index', {
        method: 'post',
        data: data
    })
}