import {request} from './request'
 
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
// 导入的request+方法中的url+params中的范型
// 然后return回方法中

export function getRecommend(){
  return request({
    url:'/recommend'
  })
}


// 构造一个类class

export class Goods{
  // 构造函数,通过一个类让我整合这些数据
  constructor(itemInfo,columns,services){
    this.title=itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discount
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam{
  constructor(info,rule){
    //这里images可能没有值（某些商品有值，某些商品没有值）
    this.image=info.images? info.images[0] : '';
    this.infos=info.set;
    this.sizes=rule.tables
  }
}