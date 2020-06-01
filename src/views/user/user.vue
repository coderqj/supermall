<template>
  <div id="profile">
    <!-- <img src="~assets/img/people/003.jpg" alt=""> -->
    <NavBar class="homeNav">
      <div slot="center">秦杰的店铺</div>
    </NavBar>
    <UserInfo></UserInfo>
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
            <div class="account-info">我的优惠</div>
          </div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
            <div class="account-info">我的积分</div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/navBar'
import UserInfo from './childComps/UserInfo'
export default {
  name:"Profile",
  components:{
    NavBar,
    UserInfo
  },
  data(){
    return{

    }
  }
}
</script>

<style>
  #profile {
    background-color: #f2f2f2;
  }
.homeNav{
  background-color:var(--color-tint);
  color: white;
  }
    .account {
    display: flex;
  }
  .account-item{
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }
  .account-item:last-of-type{
    margin-right: 0;
  }
  .account-item{
    color: #666;
    font-size: 13px;
    padding: 18px;
  }
  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
   .account-info {
    margin-top: 6px;
  }
</style>