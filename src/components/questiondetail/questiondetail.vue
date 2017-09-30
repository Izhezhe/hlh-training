<template>
  <transition name="move">
    <div class="ques-detail">
      <div class="header">
        <router-link to="/questions">
          <span class="icon iconfont icon-fanhui"></span>
        </router-link>
        <h1 class="title">考题</h1>
      </div>
      <div class="questions-wrapper" ref="questionsWrapper">
        <div>
          <div class="header-area">
            <span class="icon iconfont icon-title"></span>
            <span class="title">单选题</span>
          </div>
          <ul>
            <li v-for="( issue,index ) in issues" class="question-item">
              <span class="order">{{index+1}}.</span>
              <span class="issue" v-for="iss in issue.issue">{{iss}}</span>
              <div class="answer" v-for="option in issue.answer">
                <span class="icon iconfont" :class="{'icon-zhengquedaan':option.type===1}"></span>
                <span class="text">{{option.option}}</span>
              </div>
              <div class="analyze">
                <h1 class="title">答案解析：</h1>
                <p class="content" v-for="list in issue.analyze">{{list}}</p>
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
    data () {
      return {
        apiUrl: '/api/questions',
        issues: [],
        ERR_OK: 0
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
        this.$http.get(this.apiUrl).then((res) => {
          res = res.body
          if (res.errno === this.ERR_OK) {
            let questions = res.data.questions
            questions.forEach((ques) => {
              if (ques.code === code) {
                this.issues = ques.issues
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
          this.scroll = new BScroll(this.$refs.questionsWrapper, {
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
  .ques-detail
    position fixed
    top 0px
    left 0px
    z-index 60
    width 100%
    height 100%
    // transition all 0.4s
    // &.move-transition
    //   opacity 1
    // &.move-enter, &.move-leave-active
    //   opacity 0
    .questions-wrapper
      position absolute
      top 44px
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
        padding 0 16px 25px
        font-size 0
        position relative
        .order, .issue
          display inline-block
          line-height 25px
          font-size 18px
          color #3c3c3c
          margin-top 5px
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
            font-size 22px
            color #59b0f5
            position absolute
          .text
            display inline-block
            vertical-align top
            margin-top -1px
            padding-left 35px
            line-height 24px
            font-size 16px
            color #6c6c6c
        .analyze
          margin-top 10px
          color #6c6c6c
          .title
            line-height 18px
            font-size 18px
          .content
            line-height 24px
            font-size 16px
            margin-top 10px
</style>