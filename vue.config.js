'use strict';
let publicPath = './';
module.exports = {
  publicPath: publicPath,
  // 先写一个configureWebpack 表示你准备配置webpageconfig
  configureWebpack: {
    // 配置路径相关的时候用resolve 可以解决路径相关的问题
    resolve: {
      // 别名ps：.vue等相关的其实已经写了，这里只需要写我们自己需要的
      alias: {
        // 默认有@  他指向的是：src
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'styles': '@/styles',
        'service': '@/service',
        'views': '@/views',
        'store': '@/store',
        'apis': '@/apis',
        'utils': '@/utils'
        // router 一般情况下不用配置，因为只有在main.js中引用一次，如果有需要也可以在这里配置
        // 'router': '@/router'
      }
    }
  },
  devServer: {
    proxy: {
      '/lci': {
        // target: 'https://api.tianlunzhimei.com',
        target: 'http://sinyee.f3322.net:18080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          // '^/lci': ''
        }
      }
    }
  }
};
