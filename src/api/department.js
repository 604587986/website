import request from '@/utils/request'

export function getDepartmentList(data) {
    return request('/department/index', {
        method: 'post',
        data: data
    })
}