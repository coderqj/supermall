import Vue from 'vue'
import App from './App.vue'
import router from  './router'
import store from './store'
Vue.config.productionTip = false
// 事件总线要在原型main.js中定义
//  让事件总线$bus为一个Vue实例，既可以用Vue实例发射事件和监听事件
Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  // 挂载router
  router,
  store
}).$mount('#app')
