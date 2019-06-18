import request from '@/utils/request'

export function getTagList(data) {
    return request('/tag/index', {
        method: 'post',
        data: data
    })
}