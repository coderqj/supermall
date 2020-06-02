<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <mainTabBar/>
    <Icon></Icon>
    <SvgIcon></SvgIcon>
  </div>
</template>

<script>
import mainTabBar from 'components/content/mainTabbar/MainTabBar'
import Icon from 'components/content/Icon/Icon.vue'
import SvgIcon from 'components/content/Icon/svg.vue'
export default {
  name: 'App',
  components: {
    mainTabBar,
    Icon,
    SvgIcon
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
