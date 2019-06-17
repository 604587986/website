import request from '@/utils/request'

export function buildContent(data) {
    return request('/web_build/buildContent', {
        method: 'post',
        data: data
    })
}