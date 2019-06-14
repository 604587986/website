import { extend } from 'umi-request';

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
export default request;