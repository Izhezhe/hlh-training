<template>
  <div class="case">
    <div class="header">
      <router-link to="/index">
        <span class="icon iconfont icon-fanhui"></span>
      </router-link>
      <h1 class="title">案例</h1>
    </div>
    <div class="m-search2">   
      <div class="m-search-place">
        <i class="icon iconfont icon-search"></i>
       <span>搜索法律法规名称</span>
      </div>
      <input type="text" placeholder="" class="input-bg" readonly @click.stop.prevent="none">
    </div>
    <div class="m-box wrapper" ref="wrapper">
        <ul class="m-al-list content">       
          <li class="m-al-list-li" v-for="list in leves"  >
            <router-link to="" @click.native="toDetail(list, 1)" height="175px">
                <img :src="list.fragtrains[0].imgUrl" alt="" class="m-list-img">
            </router-link>
            <ul class="m-list-ic">
              <router-link to="" @click.native="toDetail(list, 1)">
                <li>
                  <i class="icon iconfont icon-shipin1"></i>
                  <span>看视频</span>
                </li>
              </router-link>
              |
              <router-link to="" @click.native="toDetail(list, 2)">
                <li>
                  <i class="icon iconfont icon-erji"></i>
                  <span >听音频</span>
                </li>
              </router-link>
              |
              <router-link to="" @click.native="toDetail(list, 1)">
                <li>
                  <i class="icon iconfont icon-biji"></i>
                  <span>读笔记</span>
                </li>
              </router-link>
            </ul>
          </li>
        </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        apiUrl: '/api/caseL',
        leves: [],
        ERR_OK: 0
      }
    },
    created () {
      this.$http.get(this.apiUrl).then((res) => {
        res = res.body
        if (res.errno === this.ERR_OK) {
          this.leves = res.data.leves
          this.$nextTick(() => {
            this.initScroll()
          })
        }
      })
    },
    methods: {
      none () {
        alert('暂无搜索功能')
      },
      initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      toDetail (list, type) {
        this.$router.push({
          path: '/case/casedetail',
          query: {
            lid: `${list.lid}`,
            fid: `${list.fragtrains[0].fid}`,
            type: type
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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

.m-search2
  margin 10px 0
  text-align center
  padding 0 15px
  position relative
  input
    height 30px
    line-height 30px
    width 100%
    color #888888
    opacity 0.8
    border-radius 15px
    text-align center
    background #eeeeee
  .m-search-place
    position absolute
    left 50%
    top 0px
    line-height 30px
    font-size 14px
    margin-left -60px


.m-header
  .icon
    float left
    margin-left 15px
.case 
  .m-search
    input
      opacity 1
    .m-search-place
      color #888 
  .m-box
    padding-top 10px
    margin-top 10px
    position absolute
    bottom 50px
    top 90px 
    width 100%  
    overflow hidden 
.m-box
  .m-al-list
    background #fff
    padding 0px 15px 10px 15px
    .m-al-list-li
      border 1px solid #bcbcbc
      border-radius 4px
      margin-bottom 20px
    a
      display block
      .m-list-img
        width 100%
        height 175px
    .m-list-ic 
      padding 10px 15px
      display flex
      flex-direction row 
      justify-content space-between
      color #bcbcbc
      span
        color #3c3c3c
      .icon-shipin1
        color #58aff4   
      .icon-erji
        color #f8a01e 
      .icon-biji
        color #99c7a7 



</style>