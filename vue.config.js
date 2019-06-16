module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars:{
                    'table-header-color':'rgb(144, 147, 153)'
                },
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