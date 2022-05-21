import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles.scss'
import './common.scss'
import  ElementUI from 'element-ui';
import VueSocketIO from 'vue-socket.io'

Vue.use(ElementUI);

Vue.use(new VueSocketIO({
  debug:true,
  connection:'http://127.0.0.1:7001',
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
