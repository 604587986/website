import { extend } from 'umi-request';
import store from '@/store'
import { notification } from 'ant-design-vue'
import Cookie from "js-cookie"

const request = extend({
    maxCache: 10, // 最大缓存个数, 超出后会自动清掉按时间最开始的一个.
    prefix: '/api', // prefix
    suffix: '', // suffix
    credentials: 'include',
    errorHandler: (error) => {
        // 集中处理错误
    },
    headers: {
    },
    params: {
    }
});

request.interceptors.request.use((url, options) => {
    const mock_user = Cookie.get('mock_user')
    const mock_site = Cookie.get('mock_site')

    const mergeData = {
         mock_site, mock_user 
    }
    options.data = { ...options.data, ...mergeData }

    return (
        {
            options: options
        }
    )
});



// response拦截器, 处理response
request.interceptors.response.use(async (response, options) => {
    const data = await response.clone().json();
    if (data && data.code === 200) {
        return response;
    } else if (data && data.code === 401) {
        alert('请登录')
        // location.reload()
        store.commit('LOGOUT')
        return Promise.reject();
    } else {
        notification.error({ message: data.message })
        return Promise.reject();
    }
});



export default request;