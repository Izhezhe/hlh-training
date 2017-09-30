<template>
  <transition name="move">
    <div class="twolaw">
      <div class="header">
        <router-link to="/code">
          <span class="icon iconfont icon-fanhui"></span>
        </router-link>
        <h1 class="title">法规</h1>
      </div>
      <div class="laws-wrapper" ref="twolawsWrapper">
        <ul>
          <li v-for="twolaw in twolaws" class="laws-item border-1px">
            <router-link to="" @click.native="toDetail(twolaw)">
              <div class="nowrap">
                <span>{{twolaw.text}}</span>
              </div>
              <span class="icon iconfont icon-gengduo"></span>
            </router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        apiUrl: '/api/code',
        twolaws: [],
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
        this.$http.get(this.apiUrl).then((res) => {
          res = res.body
          if (res.errno === this.ERR_OK) {
            let laws = res.data.laws
            laws.forEach((law) => {
              if (law.code === code) {
                this.twolaws = law.twolaws
                this.$nextTick(() => {
                  this.initScroll()
                })
              }
            })
          }
        })
      },
      initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.twolawsWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      toDetail (twolaw) {
        this.$router.push({
          path: '/code/codedetail',
          query: {
            code: this.code,
            twocode: `${twolaw.twocode}`
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .twolaw
    position fixed
    top 0px
    left 0px
    z-index 60
    width 100%
    height 100%
    transition all 0.4s
    &.move-transition
      opacity 1
    &.move-enter, &.move-leave-active
      opacity 0
    .laws-wrapper
      top 44px
      bottom 0px
</style>