export default {
    // action里面的操作是可以返回一个promise
    addCart(context,payload){
        return new Promise((resolve,reject)=>{
            // state.cartList.push(payload)
        // 1.查找之前数组中是否有该商品
        // 通过find函数去遍历数组cartlist,如果return为true也就是说item.iid=payload.iid的话那么把这个item传到peodut中
        let product = context.state.cartList.find(item => item.iid === payload.iid);
        // 2.根基上面查找结果,如果有的哈给product数量加1没有的话往cartList中添加该商品
        if (product){ //数量+1
            context.commit('addCounter',product);
            resolve('加入购物车，已购'+ product.count+'个')
        }else{//添加新的商品
            payload.count =1;
            context.commit('addCartToCart',payload);
            resolve('加入购物车，添加新的商品')
        }
        })
    }
}

