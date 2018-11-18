import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import callHook from '@/page/modules/explore/callhook'
import vuxInput from '@/page/modules/explore/vuxInput'
import vModel from '@/page/modules/vueApi/vModel'
import input from '@/page/modules/vueApi/vModel/input'
import setMap from '@/page/modules/es6/setMap'
import proxy from '@/page/modules/es6/proxy'
import replace from '@/page/modules/regExp/replace'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/regexp/replace',
      name: 'replace',
      component: replace
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
    },
    {
      path: '/es6/setmap',
      name: 'setMap',
      component: setMap
    },
    {
      path: '/es6/proxy',
      name: 'proxy',
      component: proxy
    }
  ]
})
