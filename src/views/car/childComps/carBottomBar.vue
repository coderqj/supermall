<template>
  <div class="bottomBar">
    <div class="checkContent">
      <CheckButton class="checkButton" :isClick="isSelectedAll" @click.native="checkClick"/>
      <div>全选</div>
    </div>
      <div class="checkPrice">
        合计：{{totalPrice}} 元
      </div>
    <div class="checkGo" @click="checkGo">
        去结算({{checkLength}})
    </div>
    <toast :message="message" :isShow="isShow"/>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/checkButton'
import toast from 'components/common/toast/toast'

// import { mapGetters } from 'vuex'

export default {
    name:'carBottomBar',
    data(){
        return{
            message:'',
            isShow:false,
        }
    },
    components:{
        CheckButton,
        toast
    },
    computed:{
    //     ...mapGetters({
    //   // vue实例中计算属性名:vuex的store对象中的getters属性的方法名
    //         totalPrice:'totalPrice'
    // })
    // },
        totalPrice(){
            return this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue+ item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectedAll(){
            // 先使用过滤器过滤那些没有选中的item，如果没有选中的项目的长度，那么返回false
            // return ! (this.$store.state.cartList.filter(item => !item.checked).length)
            if (this.$store.state.cartList.length ===0){
                return false
            }else{
                return ! this.$store.state.cartList.find(item=> ! item.checked)

            }
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectedAll){ //全部选中
                this.$store.state.cartList.forEach(item => item.checked = false)
            }else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        checkGo(){
            if(!this.isSelectedAll){
                // console.log('this.$toast.toastShow',this.$toast.toastShow)
                // console.log('this.$toast',this.$toast)
                this.message = '请先选择商品，再去结算',
                this.isShow = true,
                setTimeout(()=>{
                this.isShow=false;
                this.message=''
                },4000)
                // this.$toast.toastShow('请先选择购买的商品',3000)
            }
        }
    }
}
</script>

<style scoped>
    .bottomBar{
        height: 40px;
        position: fixed;
        background-color:#eee;
        left: 0;
        right: 0;
        bottom:49px;
        line-height: 40px;
        display: flex;
    }
    .checkContent{
        display: flex;
        align-items: center;
        width:60px;

    }
    .checkButton{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .checkPrice{
        margin-left: 20px;
        flex: 1
    }
    .checkGo{
        /* margin-left: 39px; */
        background: var( --color-tint);
        color: white;
        width:130px;
        text-align: center
    }
</style>