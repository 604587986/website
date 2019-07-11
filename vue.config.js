module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'table-header-color': 'rgb(144, 147, 153)'
                },
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: process.env.api_url,
                changeOrigin: true,
            },
            '/attachment': {
                target: process.env.api_url,
                changeOrigin: true,
            },
        }
    }

}
