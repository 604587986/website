import request from '@/utils/request'

export function getSiteInfo() {
    return request('/global_set/adminLoginInfo', {
        method: 'post'
    })
}
export function captcha() {
    return request('/captcha/get_captcha', {
        method: 'post'
    })
}
export function login(data) {
    return request('/login/login', {
        method: 'post',
        data: data,
    })
}
export function getUserInfo() {
    return request('/login/init', {
        method: 'post'
    })
}
export function logout() {
    return request('/login/logout', {
        method: 'post'
    })
}