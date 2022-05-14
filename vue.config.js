const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // axios.post('/api/user/login')
    // axios.post('http://192.168.1.5:7001/user/login');
    // 当你配置完以后,需要重启项目;

    // http://localhost:8080/api/user/login
    proxy:{
      '/api':{
        target:'http://localhost:7001',  //服务端的域名地址;
        ws: true,   
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      },
      '/newApi':{
        target:'http://localhost:7002',  //服务端的域名地址;
        ws: true,   
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      },
    }
  }
})
