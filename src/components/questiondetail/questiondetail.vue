<template>
  <transition name="move">
    <div v-show="showFlag" class="ques-detail">
      <div class="header">
        <span class="icon iconfont icon-hua_" @click="showFlag = !showFlag"></span>
        <h1 class="title">考题</h1>
      </div>
      <div class="questions-wrapper" ref="questionsWrapper">
        <div>
          <div class="header-area">
            <span class="icon iconfont icon-title"></span>
            <span class="title">单选题</span>
          </div>
          <ul>
            <li v-for="( question,index ) in questions" class="question-item">
              <span class="order">{{index+1}}.</span>
              <span class="issue">{{question.issue}}</span>
              <div class="answer">
                <span class="icon iconfont icon-hua_"></span>
                <span class="text">{{question.answer}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      questions: {
        type: Array
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
            this.scroll = new BScroll(this.$refs.questionsWrapper, {
              click: true
            })
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
  .ques-detail
    position fixed
    top 0px
    left 0px
    z-index 60
    width 100%
    height 100%
    transition all 0.4s
    &.move-transition
      transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
    .questions-wrapper
      position absolute
      top 43px
      bottom 0px
      width 100%
      background #fff
      overflow hidden
      .header-area
        padding 20px 0 25px 16px
        font-size 0
        span
          display inline-block
          line-height 18px
          font-size 18px
          color #3c3c3c
          &.icon
            margin-right 10px
            color #59b0f5
      .question-item
        padding-right 16px
        padding 0 16px 30px
        font-size 0
        position relative
        .order, .issue
          display inline-block
          line-height 25px
          font-size 18px
          color #3c3c3c
        .order
          position absolute
          left 15px
          top 0px
        .issue
          padding-left 27px
        .answer
          margin-left 27px
          margin-top 18px
          font-size 0
          position relative
          .icon
            display inline-block
            vertical-align top
            font-size 20px
            color #59b0f5
            position absolute
          .text
            display inline-block
            vertical-align top
            padding-left 40px
            line-height 24px
            font-size 16px
            color #6c6c6c
</style>