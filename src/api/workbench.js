import request from '@/utils/request'

//图表数据
export function getData() {
    return request('/statistics/getData', {
        method: 'post'
    })
}
//站点数据
export function getDataBySite(data) {
    return request('/statistics/getDataBySite', {
        method: 'post',
        data
    })
}
//站点访问排行
export function siteViewsRanking(data) {
    return request('/statistics/siteViewsRanking', {
        method: 'post',
        data
    })
}
//文章数量排行
export function articleCountRanking(data) {
    return request('/statistics/articleCountRanking', {
        method: 'post',
        data
    })
}
//文章访问排行
export function articleViewsRanking(data) {
    return request('/statistics/articleViewsRanking', {
        method: 'post',
        data
    })
}