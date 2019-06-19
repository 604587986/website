import { notification } from 'ant-design-vue'
import Cookie from "js-cookie"

import axios from "axios"
const request = axios.create({
    baseURL: '/api',
    withCredentials: true,

})


request.interceptors.request.use(
    config => {
        const mock_user = Cookie.get('mock_user')
        const mock_site = Cookie.get('mock_site')

        const mergeData = {
            mock_site, mock_user
        }

        config.data = { ...config.data, ...mergeData }

        return config
    },
    error => {
        return Promise.reject(error)
    }
);



// response拦截器, 处理response
request.interceptors.response.use(
    response => {
        if (response && response.data && response.data.code === 200) {
            return response.data
        } else if (response && response.data && response.data.code === 404) {
            return response.data
        } else {
            notification.error({ message: response.data.message })
            return Promise.reject(response.data.message)
        }

    },
    error => {
        notification.error({ message: error.response.data })
    }
);



export default request;