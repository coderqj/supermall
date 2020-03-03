import Toast from './toastPlugin'
const obj ={}

obj.install = function(Vue){
    console.log('执行了obj的install函数',Toast)
    // 1.要创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    // 2.new的方式，根据组件构造器，可以创建一个组件对象
    const toast = new toastContrustor();
    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    // 4.toast.$el对应的就是div
    // 下面这句话的意思是把toast对象组件的template样式添加到body上面
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = Toast
}
 export default obj 