import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const setMap = () => import('@/page/modules/es6/setMap')
const generator = () => import('@/page/modules/es6/generator')
const proxy = () => import('@/page/modules/es6/proxy')
const promise = () => import('@/page/modules/es6/promise')
const async = () => import('@/page/modules/es6/async')
const axios = () => import('@/page/modules/axios')
const callHook = () => import('@/page/modules/explore/callHook')
const countUp = () => import('@/page/modules/explore/vux/countUp')
const border = () => import('@/page/modules/explore/css/border')
const gradient = () => import('@/page/modules/explore/css/gradient')
const rotate = () => import('@/page/modules/explore/css/rotate')
const svg = () => import('@/page/modules/explore/css/svg')
const gpu = () => import('@/page/modules/explore/css/gpu')
const stroke = () => import('@/page/modules/explore/css/svg/stroke')
const scroll = () => import('@/page/modules/explore/event/scroll')
const grid = () => import('@/page/modules/explore/css/grid')
const vuxInput = () => import('@/page/modules/vueApi/vModel/input')
const vModel = () => import('@/page/modules/vueApi/vModel')
const replace = () => import('@/page/modules/regExp/replace')
const reverseNumber = () =>
  import('@/page/modules/practice/string/reverseNumber')
const zeroCount = () => import('@/page/modules/practice/number/zeroCount')
const twoPoint = () => import('@/page/modules/practice/array/twoPoint')
const radio = () => import('@/page/modules/practice/other/radio')
const mixins = () => import('@/page/modules/practice/other/mixins')
const hoc = () => import('@/page/modules/practice/other/hoc')
const echart = () => import('@/page/modules/practice/other/echart')
export default {
  generator: {
    path: '/es6/generator',
    name: 'generator',
    component: generator
  },
  setMap: {
    path: '/es6/setmap',
    name: 'setMap',
    component: setMap
  },
  proxy: {
    path: '/es6/proxy',
    name: 'proxy',
    component: proxy
  },
  promise: {
    path: '/es6/promise',
    name: 'promise',
    component: promise
  },
  async: {
    path: '/es6/async',
    name: 'async',
    component: async
  },
  axios: {
    path: '/axios',
    name: 'axios',
    component: axios
  },
  vuxInput: {
    path: '/explore/vuxinput',
    name: 'vuxInput',
    component: vuxInput
  },
  scroll: {
    path: '/explore/event/scroll',
    name: 'scroll',
    component: scroll
  },
  border: {
    path: '/explore/css/border',
    name: 'border',
    component: border
  },
  gradient: {
    path: '/explore/css/gradient',
    name: 'gradient',
    component: gradient
  },
  rotate: {
    path: '/explore/css/rotate',
    name: 'rotate',
    component: rotate
  },
  svg: {
    path: '/explore/css/svg',
    name: 'svg',
    component: svg
  },
  gpu: {
    path: '/explore/css/gpu',
    name: 'gpu',
    component: gpu
  },
  stroke: {
    path: '/explore/css/svg/stroke',
    name: 'stroke',
    component: stroke
  },
  grid: {
    path: '/explore/css/grid',
    name: 'grid',
    component: grid
  },
  callHook: {
    path: '/explore/callhook',
    name: 'callHook',
    component: callHook
  },
  countUp: {
    path: '/explore/vux/countUp',
    name: 'countUp',
    component: countUp
  },
  vModel: {
    path: '/vueapi/vmodel',
    name: 'vModel',
    component: vModel
  },
  replace: {
    path: '/regexp/replace',
    name: 'replace',
    component: replace
  },
  reverseNumber: {
    path: '/practice/string/reversenumber',
    name: 'reverseNumber',
    component: reverseNumber
  },
  zeroCount: {
    path: '/practice/number/zerocount',
    name: 'zeroCount',
    component: zeroCount
  },
  twoPoint: {
    path: '/practice/array/twopoint',
    name: 'twoPoint',
    component: twoPoint
  },
  radio: {
    path: '/practice/other/radio',
    name: 'radio',
    component: radio
  },
  mixins: {
    path: '/practice/other/mixins',
    name: 'mixins',
    component: mixins
  },
  hoc: {
    path: '/practice/other/hoc',
    name: 'hoc',
    component: hoc
  },
  echart: {
    path: '/practice/other/echart',
    name: 'echart',
    component: echart
  }
}
