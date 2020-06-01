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
// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。/