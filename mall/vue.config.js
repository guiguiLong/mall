module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: {
            '/search': {
                target: 'https://www.imooc.com',
                changeOrigin: true
            }
        }
    }
}