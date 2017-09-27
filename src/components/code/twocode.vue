<template>
  <transition name="move">
    <div v-show="showFlag" class="twolaw">
      <div class="header">
        <span class="icon iconfont icon-hua_" @click="showFlag = !showFlag"></span>
        <h1 class="title">法规</h1>
      </div>
      <div class="laws-wrapper" ref="twolawsWrapper">
        <ul>
          <li v-for="twolaw in twolaws" class="laws-item border-1px" @click="selectLaw(twolaw,$event)">
            <div class="nowrap">
              <span>{{twolaw.text}}</span>
            </div>
            <span class="icon iconfont icon-hua_"></span>
          </li>
        </ul>
      </div>
      <codedetail :twolaw="selectedLaw" ref="codedetail"></codedetail>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import codedetail from '@/components/codedetail/codedetail'
  export default {
    props: {
      twolaws: {
        type: Array
      }
    },
    data () {
      return {
        showFlag: false,
        selectedLaw: {}
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.twolawsWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
          this.showFlag = true
        })
      },
      selectLaw (twolaw, event) {
        if (!event._constructed) { // 将PC端派发的事件拦截
          return
        }
        this.selectedLaw = twolaw
        this.$refs.codedetail.show()
      }
    },
    components: {
      codedetail
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
      transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
    .laws-wrapper
      top 43px
      bottom 0px
</style>