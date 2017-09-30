import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Code from '@/components/code/code'
import TwoCode from '@/components/code/twocode'
import Codedetail from '@/components/codedetail/codedetail'
import Case from '@/components/case/case'
import Questions from '@/components/questions/questions'
import Questiondetail from '@/components/questiondetail/questiondetail'
import CaseDetail from '@/components/casedetail/casedetail'
import NodeList from '@/components/nodeppt/nodelist'
import Pptlist from '@/components/nodeppt/pptlist'
import NodeDetail from '@/components/nodeppt/nodedetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index' // 重定向
    },
    { // 首页
      path: '/index',
      name: 'index',
      component: Index
    },
    { // 规划
      path: '/code',
      name: 'code',
      component: Code,
      children: [
        {
          path: 'twocode',
          component: TwoCode
        },
        {
          path: 'codedetail',
          component: Codedetail
        }
      ]
    },
    { // 案例
      path: '/case',
      name: 'case',
      component: Case,
      children: [
        {
          path: 'casedetail',
          component: CaseDetail
        },
        {
          path: 'nodelist',
          component: NodeList
        },
        {
          path: 'pptlist',
          component: Pptlist
        },
        {
          path: 'nodedetail',
          component: NodeDetail
        }
      ]
    },
    { // 考题
      path: '/questions',
      name: 'questions',
      component: Questions,
      children: [
        {
          path: 'quesdetail',
          component: Questiondetail
        }
      ]
    }
  ]
})
