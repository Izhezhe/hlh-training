<template>
  <div class="code">
    <div class="header">
      <span class="icon iconfont icon-hua_"></span>
      <h1 class="title">法规</h1>
    </div>
    <div class="m-search">
      <div class="m-search-place">
        <i class="icon iconfont icon-search"></i>
       <span>搜索法律法规名称</span>
      </div>
      <input type="text" placeholder="">
    </div>
    <div class="laws-wrapper" ref="lawsWrapper">
      <ul>
        <li v-for="law in code.laws" class="laws-item border-1px" @click="selectLaw(law, $event)">
          <div class="nowrap">
            <span>{{law.text}}</span>
          </div>
          <span class="num">{{law.twolaws.length}}</span>
          <span class="icon iconfont icon-hua_"></span>
        </li>
      </ul>
    </div>
    <twocode :twolaws="selectedLaw" ref="twocode"></twocode>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import twocode from '@/components/code/twocode'
  export default {
    data () {
      return {
        apiUrl: '/api/code',
        code: {},
        ERR_OK: 0,
        selectedLaw: []
      }
    },
    created () {
      this.$http.get(this.apiUrl).then((res) => {
        res = res.body
        if (res.errno === this.ERR_OK) {
          this.code = res.data
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.lawsWrapper, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      })
    },
    methods: {
      selectLaw (law, event) {
        if (!event._constructed) { // 将PC端派发的事件拦截
          return
        }
        this.selectedLaw = law.twolaws
        this.$refs.twocode.show()
      }
    },
    components: {
      twocode
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .code
    .header
      width 100%
      height 43px
      background #151418
      text-align center
      font-size 0
      .icon, .title
        display inline-block
        line-height 43px
        font-size 19px
        color #fff
      .icon
        position absolute
        left 5px
        top 0px
        padding 0 10px
    .m-search
      text-align center
      position fixed
      top 60px
      left 0
      width 100%
      input
        height 30px
        line-height 30px
        width 75%
        background #eeeeee
        color #888888
        opacity 0.8
        border-radius 15px
        text-align center
        padding-left 14px
      .m-search-place
        position absolute
        left 50%
        top 8px
        margin-left -60px
    .laws-wrapper
      position absolute
      top 91px
      bottom 50px
      width 100%
      background #fff
      overflow hidden
      .laws-item
        padding 0 16px
        line-height 43px
        font-size 17px
        border-1px(#dfdfdf)
        position relative
        &:last-child
          border-none()
        .nowrap
          padding-right 62px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          color #3c3c3c
        .num
          position absolute
          right 34px
          top 0px
          color #b2b2b2
        .icon
          position absolute
          right 15px
          top 0px
          font-size 14px
</style>