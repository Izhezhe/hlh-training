<template>
  <div class="index"  >
  	<div class="header">
      <span class="icon iconfont"></span>
      <h1 class="title">首页</h1>
    </div>
  	<div class="m-search">
      <div class="m-search-place">
        <i class="icon iconfont icon-search"></i>
       <span>搜索法律法规名称</span>
      </div>
      
  		<input type="text" placeholder="" class="input-bg" readonly @click.stop.prevent="none">

  	</div>
    <div class="wrapper" ref="wrapper">
        <div>
          <div class="slider-wrapper">
            <slider>
              <div>
                <a href="http://www.baidu.com">
                  <img src="./1.jpg">
                </a>
              </div>
              <div>
                <a href="http://www.baidu.com">
                  <img src="./2.png">
                </a>
              </div>
              <div>
                <a href="http://www.baidu.com">
                  <img src="./1.jpg">
                </a>
              </div>
            </slider>
          </div>
          <div class="m-box">
              <div class="m-title">
                <i class="icon iconfont icon-icontianping"></i>
                <b class="m-title-txt">法规动态</b>
                <router-link to="/code">
                  <a href="" class="m-more" @click="">查看更多</a>
                </router-link>          
              </div>
              <ul class="m-fg-list">
                <li v-for="(law,index) in code.laws[0].twolaws" v-if="index<2">
                    <b style="display: none">{{index+1}}</b>
                    <router-link to="" @click.native="toDetail(law.twocode)">
                      <span class="m-fg-list-title" @click="">{{law.text}}</span>
                    </router-link>
                    <b>{{law.lawDetail[0]}}</b>
                </li>
              </ul>
          </div>
          <div class="m-box">
              <div class="m-title">
                <i class="icon iconfont icon-book"></i>
                <b class="m-title-txt">最新案例</b>
                <router-link to="/case">
                  <a href="" class="m-more" @click="">查看更多</a>
                </router-link>
              </div>
              <ul class="m-al-list">
                <li class="m-al-list-li" v-for="(list,index) in leves" v-if="index<5" >
                <b style="display: none">{{index+1}}</b>
                  <router-link to="" @click.native="toDetailCase(list, 1)" height="175px">
                      <img :src="list.fragtrains[0].imgUrl" alt="" class="m-list-img">
                  </router-link>
                  <ul class="m-list-ic">
                    <router-link to="" @click.native="toDetailCase(list, 1)">
                      <li>
                        <i class="icon iconfont icon-shipin1"></i>
                        <span>看视频</span>
                      </li>
                    </router-link>
                    |
                    <router-link to="" @click.native="toDetailCase(list, 2)">
                      <li>
                        <i class="icon iconfont icon-erji"></i>
                        <span >听音频</span>
                      </li>
                    </router-link>
                    |
                      <router-link to="" @click.native="toDetailCase(list, 1)">
                        <li>
                          <i class="icon iconfont icon-biji"></i>
                          <span>读笔记</span>
                        </li>
                      </router-link>
                  </ul>
              </li>
                
              </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Slider from '@/components/slider/slider'
  export default {
    data () {
      return {
        apiUrl: '/api/code',
        apiUrlCase: '/api/caseL',
        code: {},
        twolaw: {},
        leves: {},
        ERR_OK: 0
      }
    },
    created () {
      this.$http.get(this.apiUrl).then((res) => {
        res = res.body
        if (res.errno === this.ERR_OK) {
          this.code = res.data
          this.twolaw = res.data.laws[0].twolaws
          this.$nextTick(() => {
            this.initScroll()
          })
        }
      })
      this.$http.get(this.apiUrlCase).then((res) => {
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
      initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      none () {
        alert('暂无搜索功能')
      },
      toDetail (twolaw) {
        this.$router.push({
          path: '/code/codedetail',
          query: {
            code: this.code.laws[0].code,
            twocode: `${twolaw}`
          }
        })
      },
      toDetailCase (list, type) {
        this.$router.push({
          path: '/case/casedetail',
          query: {
            lid: `${list.lid}`,
            fid: `${list.fragtrains[0].fid}`,
            type: type
          }
        })
      }
    },
    components: {
      Slider
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
.index
  font-size 14px
  background #efeff4
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
.m-search
  width 100%
  padding 0 15px
  text-align center
  box-sizing: border-box
  position fixed
  top 54px
  left 0
  z-index 20
  input
    height 30px
    line-height 30px
    width 100%
    background #eeeeee
    color #888888
    opacity 0.8
    border-radius 15px
    text-align center
 .m-search-place
    position absolute
    left 50%
    top 0px
    line-height 30px
    font-size 14px
    margin-left -60px

.wrapper
  position absolute
  top 44px
  bottom 50px
  width 100%
  z-index -1
  overflow hidden
  .m-title
    background #fff
    padding 0 15px
    line-height 60px
    .icon
      color #59b0f5
      font-size 18px
      margin-right 8px
    .m-title-txt
      font-size 18px
      font-weight 600
    .m-more
      float right
      font-size 14px
      color #b3b3b3
  .m-fg-list
    background #fff
    padding 0 15px
    li
      padding 20px 0 20px 0  
    li:first-child
      border-bottom 1px solid #e0e0e0 
    span,b
      display block
    span 
      font-size 16px
      font-weight 600
      line-height 22px
      margin-bottom 8px
    b
      color #888888
      font-size 16px
      line-height 20px
      height 40px 
      overflow hidden

  .slider-wrapper
    position: relative
    width: 100%
    height 193px
    overflow: hidden

  .m-box
    margin-bottom 10px
    .m-al-list
      background #fff
      padding 0 15px
      height 100%
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