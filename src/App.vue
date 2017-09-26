<template>
  <div id="app">
    <router-view></router-view>
    <div class="tab-wrapper">
      <div class="tab">
        <div class="tab-item">
          <router-link to="index">
            <i class="icon iconfont icon-shouye"></i>
            <span class="text">首页</span>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="code">
            <i class="icon iconfont icon-icontianping"></i>
            <span class="text">规划</span>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="case">
            <i class="icon iconfont icon-book"></i>
            <span class="text">案例</span>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link to="questions">
            <i class="icon iconfont icon-tiku"></i>
            <span class="text">考题</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab-wrapper
      position fixed
      bottom 0px
      width 100%
      z-index 50
      .tab
        display flex
        text-align center
        background #fff
        height 49px
        border-top 1px solid #e0e0e0
        .tab-item
          flex 1
          padding-top 7px
          a
            .icon
              display block
              color #e0e0e0
            .text
              margin-top 5px
              font-size 10px
              color #888
            &.router-link-active
              .icon, .text
                color #59b0f5
        
</style>
