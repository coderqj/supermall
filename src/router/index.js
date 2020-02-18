import vue from 'vue'
import vuerouter from 'vue-router'

// 1.安装插件
vue.use(vuerouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect:'/home'
  },
  {
    path:'/home',
    component:()=>import('views/home/home'),
    meta:{
      title:'首页'
    }
  },
  {
    path:'/list',
    component:()=>import('views/list'),
    meta:{
      title:'分类'
    }
  },{
    path:'/car',
    component:()=>import('views/car'),
    meta:{
      title:'购物车'
    }
  },{
    path:'/user',
    component:()=>import('views/user'),
    meta:{
      title:'我的'
    }
  },
]
const router = new  vuerouter({
  routes,
  mode:'history'
})

export default router