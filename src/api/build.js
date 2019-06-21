import request from '@/utils/request'

//生成内容页
export function buildContent(data) {
    return request('/web_build/buildContent', {
        method: 'post',
        data: data
    })
}
// 获取首页模板
export function dir(data) {
    return request('/web_build/dir', {
        method: 'post',
        data: data
    })
}
//生成首页
export function buildIndex(data) {
    return request('/web_build/buildIndex', {
        method: 'post',
        data: data
    })
}