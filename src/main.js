import Vue from 'vue'
import App from './App.vue'
import router from  './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast/index'
Vue.config.productionTip = false
// 事件总线要在原型main.js中定义
//  让事件总线$bus为一个Vue实例，既可以用Vue实例发射事件和监听事件
Vue.prototype.$bus=new Vue()

// 安装toast插件，这样只要程序一启动，这个插件就会使用
Vue.use(toast)
Vue.use(VueLazyLoad,{
  // 下面是占位符，也就是说当图片没有加载出来的时候使用下面的图片代替
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  // 挂载router
  router,
  store
}).$mount('#app')


// 使用vue中图片懒加载的方式
// 安装->导入->Vue.use->修改img标签的 :src->v-lazy