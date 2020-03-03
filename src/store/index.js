import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
// 安装插件
Vue.use(Vuex)
const state={
    cartList:[]
}
// 创建store对象
const store = new Vuex.Store({
    state,
    // Vuex中一定需要mutation给state赋值
    // mutations每个方法中的完成的事件要比较单一,稍微复杂的函数一般放到actions中去处理
    mutations,
    actions,
    getters
})

// 3.挂载到vue实例上
export default store

// 数组中常用的方法:push,pop,unshift,shift,sort,reverse,map,reduce,join