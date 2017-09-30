<template>
  <transition name="ppt">
    <div class="list">
      <div class="header">
        <router-link :to="{ path: 'casedetail', query: { lid: lid, fid: fid, type: 1 } }">
          <span class="icon iconfont icon-fanhui"></span>
        </router-link>
        <h1 class="title">ppt</h1>
      </div>
      <div class="laws-wrapper" ref="wrapper">
        <ul>
          <li v-for="list in lists" class="laws-item border-1px">
            <div class="nowrap">
              <a :href="list.pptlink"><span>{{list.title}}</span></a>
            </div>
            <!-- <span class="icon iconfont icon-gengduo"></span> -->
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        apiUrl: '/api/caseL',
        lists: [],
        ERR_OK: 0,
        lid: 0,
        fid: 0
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
        let lid = parseInt(this.$route.query.lid)
        let fid = parseInt(this.$route.query.fid)
        this.lid = lid
        this.fid = fid
        this.$http.get(this.apiUrl).then((res) => {
          res = res.body
          if (res.errno === this.ERR_OK) {
            let leves = res.data.leves
            leves.forEach((leve) => {
              if (leve.lid === lid) {
                let fragtrains = leve.fragtrains
                fragtrains.forEach((train) => {
                  if (train.fid === fid) {
                    let nodelists = train.nodeLists
                    nodelists.forEach((nodelist) => {
                      if (nodelist.type === 2) {
                        this.lists = nodelist.pptlist
                        this.$nextTick(() => {
                          this.initScroll()
                        })
                      }
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
          this.scroll = new BScroll(this.$refs.wrapper, {
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
  @import "../../common/stylus/mixin.styl"
  .list
    position fixed
    top 0px
    left 0px
    z-index 60
    width 100%
    height 100%
    // transition all 0.4s
    // &.ppt-transition
    //   opacity 1
    // &.ppt-enter, &.ppt-leave-active
    //   opacity 0
    .header
      width 100%
      height 44px
      background #151418
      text-align center
      font-size 0
      .icon, .title
        display inline-block
        line-height 44px
        font-size 19px
        color #fff
      .icon
        position absolute
        left 5px
        top 2px
        padding 0 10px
    .laws-wrapper
      position absolute
      top 44px
      bottom 0px
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
          font-size 12px
          color #bbbbc1
</style>