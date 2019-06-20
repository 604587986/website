import request from '@/utils/request'


//检查文件是否存在
export function upload_check(data) {
    return request('/attachment/upload_check', {
        method: 'post',
        data: data
    }).then(res => {
        return Promise.resolve(res);
    })

}
//检查分片是否存在
export function chunk_check(data) {
    return request('/attachment/chunk_check', {
        method: 'post',
        data: data
    }).then(res => {
        return Promise.resolve(res);
    })
}
//请求合并
export function upload_done(data) {
    return request('/attachment/upload_done', {
        method: 'post',
        data: data
    }).then(res => {
        return Promise.resolve(res);
    })
}

// 分片上传uri
export const chunk_upload = '/api/attachment/chunk_upload'
