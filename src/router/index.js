import Vue from 'vue'
import Router from 'vue-router'
import upload from '@/components/upload'
import callHook from '@/page/modules/explore/callhook'
import vuxInput from '@/page/modules/explore/vuxInput'
import vModel from '@/page/modules/vueApi/vModel'
import input from '@/page/modules/vueApi/vModel/input'
import setMap from '@/page/modules/es6/setMap'
import proxy from '@/page/modules/es6/proxy'
import promise from '@/page/modules/es6/promise'
import replace from '@/page/modules/regExp/replace'
import reverseNumber from '@/page/modules/practice/string/reverseNumber'
import zeroCount from '@/page/modules/practice/number/zeroCount'
import twoPoint from '@/page/modules/practice/array/twoPoint'
import radio from '@/page/modules/practice/other/radio'
import reaxios from '@/page/modules/axios'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'upload',
      component: upload
    },
    {
      path: '/practice/string/reversenumber',
      name: 'reverseNumber',
      component: reverseNumber
    },
    {
      path: '/practice/number/zerocount',
      name: 'zeroCount',
      component: zeroCount
    },
    {
      path: '/practice/array/twopoint',
      name: 'twoPoint',
      component: twoPoint
    },
    {
      path: '/practice/other/radio',
      name: 'radio',
      component: radio
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
    },
    {
      path: '/es6/promise',
      name: 'promise',
      component: promise
    },
    {
      path: '/reaxios',
      name: 'reaxios',
      component: reaxios
    }
  ]
})
