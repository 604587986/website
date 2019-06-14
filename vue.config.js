module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'https://myzq.q-huan.link',
                changeOrigin: true,
            },
            '/attachment': {
                target: 'https://myzq.q-huan.link',
                changeOrigin: true,
            },
        }
    }

}