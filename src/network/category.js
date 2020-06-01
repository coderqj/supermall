import {request} from './request'
 
export function getCategory() {
    return request({
    url:'/category'
  })
}
// 导入的request+方法中的url+params中的范型
// 然后return回方法中

export function getSubcategory(maitKey) {
    return request({
      url: '/subcategory',
      params: {
        maitKey
      }
    })
  }
  
  export function getCategoryDetail(miniWallkey, type) {
    return request({
      url: '/subcategory/detail',
      params: {
        miniWallkey,
        type
      }
    })
  }