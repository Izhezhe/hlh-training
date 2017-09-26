import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import code from '@/components/code/code'
import dcase from '@/components/case/case'
import questions from '@/components/questions/questions'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/index' }, // 重定向
    { path: '/index', component: index },
    { path: '/code', component: code },
    { path: '/case', component: dcase },
    { path: '/questions', component: questions }
  ]
})
