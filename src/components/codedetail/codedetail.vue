<template>
  <transition name="fade">
    <div class="codedetail" v-show="showFlag">
      <div class="header">
        <span class="icon iconfont icon-hua_" @click="showFlag = !showFlag"></span>
        <h1 class="title">法规</h1>
      </div>
      <div class="lawdetail-wrapper" ref="detailWrapper">
        <div>
          <h1 class="title">{{twolaw.text}}</h1>
          <div class="content">
            <p v-for="cont in twolaw.lawDetail">{{cont}}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      twolaw: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.detailWrapper, {})
          } else {
            this.scroll.refresh()
          }
          this.showFlag = true
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .codedetail
    position fixed
    top 0px
    left 0px
    z-index 70
    width 100%
    height 100%
    transition all 0.4s
    &.fade-transition
      transform translate3d(0, 0, 0)
    &.fade-enter, &.fade-leave-active
      transform translate3d(100%, 0, 0)
    .lawdetail-wrapper
      position absolute
      top 43px
      bottom 0px
      width 100%
      background #fff
      overflow hidden
      color #3c3c3c
      .title
        padding 25px 16px
        line-height 24px
        font-size 24px
      .content
        padding 0 16px
        p
          line-height 25px
          font-size 17px
          padding-bottom 20px
</style>