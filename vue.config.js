module.exports={
  configureWebpack:{
    resolve:{
      // extension:[]配置后缀名省略
      alias:{
        // 配置路径别名
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
}