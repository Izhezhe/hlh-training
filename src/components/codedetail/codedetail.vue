<template>
  <transition name="fade">
    <div class="codedetail">
      <div class="header">
        <router-link :to="{ path: 'twocode', query: { code: code } }">
          <span class="icon iconfont icon-fanhui"></span>
        </router-link>
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
    data () {
      return {
        apiUrl: '/api/code',
        twolaw: {},
        ERR_OK: 0,
        code: 0
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        let code = parseInt(this.$route.query.code)
        this.code = code
        let twocode = parseInt(this.$route.query.twocode)
        this.$http.get(this.apiUrl).then((res) => {
          res = res.body
          if (res.errno === this.ERR_OK) {
            let laws = res.data.laws
            laws.forEach((law) => {
              if (law.code === code) {
                let twolaws = law.twolaws
                twolaws.forEach((twolaw) => {
                  if (twolaw.twocode === twocode) {
                    this.twolaw = twolaw
                    this.$nextTick(() => {
                      this.initScroll()
                    })
                  }
                })
              }
            })
          }
        })
      },
      initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.detailWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
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
    // transition all 0.4s
    // &.fade-transition
    //   opacity 1
    // &.fade-enter, &.fade-leave-active
    //   opacity 0
    .lawdetail-wrapper
      position absolute
      top 44px
      bottom 0px
      width 100%
      background #fff
      overflow hidden
      color #3c3c3c
      .title
        padding 19px 16px
        line-height 30px
        font-size 24px
      .content
        padding 0 16px
        p
          line-height 25px
          font-size 17px
          padding-bottom 20px
</style>