<template>
  <transition name="noded">
    <div class="codedetail">
      <div class="header">
        <router-link :to="{ path: 'nodelist', query: { lid: lid, fid: fid } }">
          <span class="icon iconfont icon-fanhui"></span>
        </router-link>
        <h1 class="title">笔记</h1>
      </div>
      <div class="lawdetail-wrapper" ref="wrapper">
        <div>
          <h1 class="title">{{list.title}}</h1>
          <div class="content">
            <p v-for="cont in list.content">{{cont}}</p>
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
        apiUrl: '/api/caseL',
        list: {},
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
        let nlid = parseInt(this.$route.query.nlid)
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
                      if (nodelist.type === 1) {
                        let lists = nodelist.lists
                        lists.forEach((list) => {
                          if (list.nlid === nlid) {
                            this.list = list
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
  .codedetail
    position fixed
    top 0px
    left 0px
    z-index 70
    width 100%
    height 100%
    // transition all 0.4s
    // &.noded-transition
    //   opacity 1
    // &.noded-enter, &.noded-leave-active
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