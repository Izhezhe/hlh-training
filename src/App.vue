<template>
  <div id="app">
    <router-view></router-view>
    <div class="tab">
      <div class="tab-item">
        <router-link to="index">首页</router-link>
      </div>
      <div class="tab-item">
        <router-link to="code">规划</router-link>
      </div>
      <div class="tab-item">
        <router-link to="case">案例</router-link>
      </div>
      <div class="tab-item">
        <router-link to="questions">考题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
