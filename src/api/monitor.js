import request from '@/utils/request'

export function getMonitorList(data) {
    return request('/queue_monitor/index', {
        method: 'post',
        data: data
    })
}