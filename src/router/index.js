import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Code from '@/components/code/code'
import TwoCode from '@/components/code/twocode'
import Codedetail from '@/components/codedetail/codedetail'
import Case from '@/components/case/case'
import Questions from '@/components/questions/questions'
import Questiondetail from '@/components/questiondetail/questiondetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index' // 重定向
    },
    { // 首页
      path: '/index',
      component: Index
    },
    { // 规划
      path: '/code',
      component: Code,
      children: [
        {
          path: ':id',
          component: TwoCode,
          children: [
            { path: ':id', component: Codedetail }
          ]
        }
      ]
    },
    { // 案例
      path: '/case',
      component: Case
    },
    { // 考题
      path: '/questions',
      component: Questions,
      children: [
        {
          path: ':id',
          component: Questiondetail
        }
      ]
    }
  ]
})
