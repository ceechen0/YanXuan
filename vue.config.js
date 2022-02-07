module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: '@import "@/assets/scss/base.scss";'
            }
        }
    },
    //地址代理
    devServer: {
        proxy: {
            '/api': {
                target: 'http://yanxuan.xiecheng.live:7001',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    //删除预处理 做到点击那个页面就加载哪个页面
    chainWebpack: config => {
        config.plugins.delete('prefetch')
    },
    //打包用的
    // publicPath:'/yx' 配置子域名
    //outputDir:'dest' 把打包完的文件夹默认dist 名改为dest
    //indexPath:'index2.html' 把打包完的默认index.html 改为 index2.html
    // productionSourceMap: false 把打包的js文件夹下的map文件删除
}