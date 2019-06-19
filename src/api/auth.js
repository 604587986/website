import request from '@/utils/request'
//用户
export function getUserList(data) {
    return request('/user/index', {
        method: 'post',
        data: data
    })
}
export function createUser(data) {
    return request('/user/create', {
        method: 'post',
        data: data
    })

}
export function editUser(data) {
    return request('/user/edit', {
        method: 'post',
        data: data
    })
}
export function saveUser(data) {
    return request('/user/save', {
        method: 'post',
        data: data
    })
}
export function deleteUser(data) {
    return request('/user/delete', {
        method: 'post',
        data: data
    })
}

//用户组
export function getGroupList(data) {
    return request('/group/index', {
        method: 'post',
        data: data
    })
}
export function createGroup(data) {
    return request('/group/create', {
        method: 'post',
        data: data
    })
}
export function editGroup(data) {
    return request('/group/edit', {
        method: 'post',
        data: data
    })
}
export function saveGroup(data) {
    return request('/group/save', {
        method: 'post',
        data: data
    })
}
export function deleteGroup(data) {
    return request('/group/delete', {
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