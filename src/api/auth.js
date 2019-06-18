import request from '@/utils/request'

export function getUserList(data) {
    return request('/user/index', {
        method: 'post',
        data: data
    })
}
export function getGroupList(data) {
    return request('/group/index', {
        method: 'post',
        data: data
    })
}
export function getPrivilegeList(data) {
    return request('/group/privileges', {
        method: 'post',
        data: data
    })
}