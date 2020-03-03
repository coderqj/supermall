export default{
    cartLength(state){
        return state.cartList.length
    },
    carList(state){
        return state.cartList
    },
    totalPrice(state){
         let pricce = state.carList.filter(item=>{ item.checked
         }).reduce((preValue,item)=>{ preValue+item.price *item.count
        },0)
        return price
    }
}