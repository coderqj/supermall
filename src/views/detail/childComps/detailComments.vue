<template>
  <div>
    <div  v-if="Object.keys(comments).length !==0" class="'comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">更多
          <!-- <i class="arrow-right"></i> -->
          <span></span>
        </div>
      </div>
      <div class="info-user">
        <img :src="comments.user.avatar" alt="">
        <span>{{comments.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{comments.content}}</p>
        <div class="info-other">
          <span class="date">{{comments.created | showDate}}</span>
          <span>{{comments.style}}</span>
        </div>
        <div class="info-imags">
          <img :src="item" v-for="(item,index) in comments.images" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/util'
export default {
  name:'detailComments',
  props:{
    comments:{
      type:Object,
      default:()=>{}
    }
  },
  filters: {
    showDate: function (value) {
      // 接口给的时间戳是（秒）单位，但是传到Date对象要是（毫秒）为单位
      let date = new Date(value*1000);
      console.log('date', date)
      // 将date格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  }

}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
    position: relative;
    right: 20px;
  }
  .header-more span{
    display: inline-block;
    width: 13px;
    height: 13px;
    background-color: white;
    position:absolute;
    top: 17px;
    margin-left: 5px;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    transform:rotate(45deg);

  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 18px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 15px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 100%;
    /* height: 70px; */
    /* margin-right: 5px; */
  }
</style>