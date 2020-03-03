export default {
     // 数量加1
    addCounter(state,payload){
        payload.count++
    },
    addCartToCart(state,payload){
        payload.checked = true
        state.cartList.push(payload)
    }
}