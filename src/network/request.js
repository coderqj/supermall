import axios from 'axios'

export function request(config){
  const instance = axios.create({
    // baseURL:'http://152.136.185.210:8000/api/h8',
    baseURL : "http://123.207.32.32:8000/api/m3" ,
    timeout:50000
  })

  // 2. axios的拦截器
  // 2.1请求拦截器的作用
  instance.interceptors.request.use(config=>{
    return config
  },err => {
    console.log('来到了request拦截failure中');
    return err
  })
//  2.2 响应拦截器的作用
  instance.interceptors.response.use(response =>{
    return response.data
  },err =>{
    return err
  })
// 发送真正的网络请求
  return instance(config)

}