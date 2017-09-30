<template>
  <transition name="cased">
    <div class="casedetail">
      <div class="header">
        <router-link to="/case">
          <span class="icon iconfont icon-fanhui"></span>
        </router-link>
        <h1 class="title">案例</h1>
      </div>
      <div class="wrapper" ref="wrapper">
        <div>
          <div class="case-box">
            <div class="case-video" v-show="type===1">
              <!-- <video controls="controls" :src="train.videoLink"></video> -->
              <iframe class="my-iframe" :src="train.videoLink" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
              <div class="check-btn" @click="type=2">
                <i class="icon iconfont icon-erji"></i>音频
              </div>
            </div>       
            <div class="case-audio" v-show="type===2">
              <audio :src="train.videoLink"></audio>
            </div>
            <div class="video-title">{{train.title}}</div>
            <div class="video-author">{{train.author}}</div>
          </div>
          <div class="other-wrapper">
            <div class="case-other">
              <div class="m-title">
                  <i class="icon iconfont icon-shipin1"></i>
                  <b class="m-title-txt">培训片段</b>
                  <span class="case-right">共<b class="">{{fragtrains.length}}</b>集</span>
              </div>
              <div class="case-other-list" ref="picWrapper">
                <ul ref="picList">
                  <li v-for="caseList in fragtrains">
                    <router-link :to="{ path: '', query: { lid: lid, fid: caseList.fid, type: 1 } }">
                      <span :class="{'active':caseList.fid===train.fid}">{{caseList.title}}</span>
                      <div class="case-other-time"><b>{{caseList.time}}</b>分钟</div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="case-other case-othertwo">
              <div class="m-title">
                  <i class="icon iconfont icon-biji"></i>
                  <b class="m-title-txt">读笔记</b>
              </div>
              <div class="case-bj-list">
                <ul >
                  <li v-for="noteList in train.nodeLists">
                    <div v-if="noteList.type===1">
                      <router-link :to="{ path: 'nodelist', query: { lid: lid, fid: fid } }">
                        <span class="case-bj-title">{{noteList.title}}</span>
                        <div class="case-bj-num"><b>{{noteList.lists.length}}</b>篇</div>
                      </router-link>
                    </div>
                    <div v-if="noteList.type===2">
                      <router-link :to="{ path: 'pptlist', query: { lid: lid, fid: fid } }">
                        <span class="case-bj-title">{{noteList.title}}</span>
                        <div class="case-bj-num"><b>{{noteList.pptlist.length}}</b>篇</div>
                      </router-link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
        apiUrl: '/api/caseL',
        train: {},
        fragtrains: [],
        ERR_OK: 0,
        lid: 0,
        fid: 0,
        type: 1
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
        let type = parseInt(this.$route.query.type)
        this.lid = lid
        this.fid = fid
        this.type = type
        this.$http.get(this.apiUrl).then((res) => {
          res = res.body
          if (res.errno === this.ERR_OK) {
            let leves = res.data.leves
            leves.forEach((leve) => {
              if (leve.lid === lid) {
                this.fragtrains = leve.fragtrains
                this.fragtrains.forEach((train) => {
                  if (train.fid === fid) {
                    this.train = train
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
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }

        if (this.fragtrains) {
          let picWidth = 192
          let margin = 15
          let width = (picWidth + margin) * this.fragtrains.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.picScroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            eventPasstrough: 'vertical' // 让外层可以滚动
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.casedetail
  background #fff
  position fixed
  top 0
  bottom 0
  z-index 60
  width 100%
  height 100%
  // transition all 0.4s
  // &.cased-transition
  //   opacity 1
  // &.cased-enter, &.cased-leave-active
  //   opacity 0
  .m-header
    text-align center
    font-size 20px
    line-height 48px
    background-color #151418
    color #fff
.m-header
  .icon
    float left
    margin-left 15px

.wrapper
  position absolute
  top 44px
  bottom 0px
  width 100%
  height 100%
  overflow hidden
  .case-box
    background #fff
    margin-bottom 10px
    video,.case-video,.case-audio
      width 100%
      height 210px
      background #000
    .case-video
      position relative
      .my-iframe
        width 100%
        height 210px
      .check-btn
        border 1px solid #ccc
        border-radius 10px
        padding 5px 10px
        position absolute
        right 10px
        top 10px
        color #fff
        .icon 
          margin-right 5px
    .video-title
      font-size 16px
      color #3c3c3c
      line-height 22px
      margin 18px 15px 8px 15px 
    .video-author
      font-size 14px 
      color #888888
      margin 0 15px 15px 15px
  .other-wrapper
    background #efeff4
    padding-top 10px
    .case-other
      padding 15px 15px
      background #fff
      margin-bottom 10px
      &:last-child
        margin-bottom 0
      .m-title
        .icon-shipin1
          color #59b0f5
          font-size 18px
          margin-right 6px
        .icon-biji
          color #99c7a7
          font-size 18px
          margin-right 6px
        .m-title-txt
          font-weight 600
          font-size 18px
        .case-right
          float right
          font-size 14px 
          color #b3b3b3
      .case-other-list
        height 95px;
        width 100%
        overflow hidden
        ul
          width 10000px;
          margin 15px 0
          li
            float left
            width 160px
            padding 16px;
            height 65px
            background #ececec
            margin-right 15px
            border-radius 4px
            line-height 20px
            font-size 14px
            &:last-child
              margin-right 0px
            .active
              color #59b0f5
            .case-other-time
              color #888888
            span
              display block
              height 40px
              overflow hidden
              position relative
      .case-bj-list
        margin 15px 0
        ul
          li
            padding 12px 15px
            background #ececec
            margin-bottom 15px
            border-radius 4px
            .case-bj-title
              display inline-block
              width 82%
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            .case-bj-num
              float right
    .case-othertwo
      padding-bottom 50px

</style>