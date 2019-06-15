import request from '@/utils/request'

export function getSiteInfo() {
    return request('/global_set/adminLoginInfo')
}
export function captcha() {
    return request('/captcha/get_captcha')
}
export function login(data) {
    return request('/login/login',{
        method:'post',
        data:data,
    })
}
export function getUserInfo() {
    return request('/login/init')
}
export function logout() {
    return request('/login/logout')
}