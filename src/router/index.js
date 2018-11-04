import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import callHook from '@/page/modules/explore/callhook'
import vuxInput from '@/page/modules/explore/vuxInput'
import vModel from '@/page/modules/vueApi/vModel'
import input from '@/page/modules/vueApi/vModel/input'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/explore/callhook',
      name: 'callHook',
      component: callHook
    },
    {
      path: '/explore/vuxinput',
      name: 'vuxInput',
      component: vuxInput
    },
    {
      path: '/vueapi/vmodel',
      name: 'vModel',
      component: vModel
    },
    {
      path: '/vueapi/vmodel/input',
      name: 'inputHtml',
      component: input
    }
  ]
})
