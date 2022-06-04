import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles.scss'
import './common.scss'
import  ElementUI from 'element-ui';
import VueSocketIO from 'vue-socket.io'

import Navigator from '@/assets/utils/navigator';
import GlobalComponent from '@/components/main.js';
Vue.use(GlobalComponent);

Vue.use(Navigator);


Vue.use(ElementUI);

Vue.use(new VueSocketIO({
  debug:true,  //是否打印日志
  connection:'http://127.0.0.1:7001',
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
