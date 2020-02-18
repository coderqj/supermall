<template>
  <div id="tar-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name:'tarBar'
}
</script>

<style>
#tar-bar{
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f6f6f6;
  box-shadow: 10px 10px 5px #888888;

}
</style>