export default {
  proxy: {
    '/wms-ops/': {
      // target: 'http://yxzttest.yangzijiang.com/', // 测试环境
      // target: 'http://yxzt.yangzijiang.com/', // 测试环境
      // target: 'http://172.16.0.168:9102', // 李志杰
      // target: 'http://47.100.87.54:9102/', // 开发环境
      // target:'http://192.168.108.154:9102' ,//
      // target:'http://172.16.0.95:9102',
      target: 'http://www.i-baby.net/', // 开发环境
      // target: 'http://www.i-baby.net/', // 生产
      // target:'http://192.168.202.160:9102',
      changeOrigin: true,
      // pathRewrite: { '^/wms-ops/': '/wms-ops/' }, // 开发环境
    },
    '/bop/api/': {
      // target: 'http://47.100.87.54:9106/', // 开发环境
      target: 'http://www.i-baby.net/', // 开发环境
      changeOrigin: true,
    },
  }
}