import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const single = () => import('@/page/modules/designPatterns/single/index.vue')
const proxyModule = () => import('@/page/modules/designPatterns/proxy/index.vue')
const flyweight = () => import('@/page/modules/designPatterns/flyweight/index.vue')
const observer = () => import('@/page/modules/designPatterns/observer/index.vue')
const strategy = () => import('@/page/modules/designPatterns/strategy')
const classEs6 = () => import('@/page/modules/es6/class')
const setMap = () => import('@/page/modules/es6/setMap')
const generator = () => import('@/page/modules/es6/generator')
const proxy = () => import('@/page/modules/es6/proxy')
const promise = () => import('@/page/modules/es6/promise')
const async = () => import('@/page/modules/es6/async')
const axios = () => import('@/page/modules/axios')
const callHook = () => import('@/page/modules/explore/callHook')
const countUp = () => import('@/page/modules/explore/vux/countUp')
const scrollBar = () => import('@/page/modules/explore/css/scroll')
const border = () => import('@/page/modules/explore/css/border')
const gradient = () => import('@/page/modules/explore/css/gradient')
const rotate = () => import('@/page/modules/explore/css/rotate')
const svg = () => import('@/page/modules/explore/css/svg')
const gpu = () => import('@/page/modules/explore/css/gpu')
const stroke = () => import('@/page/modules/explore/css/svg/stroke')
const scroll = () => import('@/page/modules/explore/event/scroll')
const grid = () => import('@/page/modules/explore/css/grid')
const codeJsx = () => import('@/page/modules/explore/codeJsx')
const throttle = () => import('@/page/modules/explore/throttle')
const clone = () => import('@/page/modules/explore/clone')
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
const chart = () => import('@/page/modules/practice/other/echart/chart')

export default {
  generator: {
    path: '/es6/generator',
    name: 'generator',
    component: generator
  },
  strategy: {
    path: '/design/strategy',
    name: 'strategy',
    component: strategy
  },
  flyweight: {
    path: '/design/flyweight',
    name: 'flyweight',
    component: flyweight
  },
  proxyModule: {
    path: '/design/proxy',
    name: 'proxyModule',
    component: proxyModule
  },
  single: {
    path: '/design/single',
    name: 'single',
    component: single
  },
  observer: {
    path: '/design/observer',
    name: 'observer',
    component: observer
  },
  setMap: {
    path: '/es6/setmap',
    name: 'setMap',
    component: setMap
  },
  classEs6: {
    path: '/es6/class',
    name: 'classEs6',
    component: classEs6
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
  throttle: {
    path: '/explore/throttle',
    name: 'throttle',
    component: throttle
  },
  clone: {
    path: '/explore/clone',
    name: 'clone',
    component: clone
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
  codeJsx: {
    path: '/explore/jsx',
    name: 'codeJsx',
    component: codeJsx
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
  scrollBar: {
    path: '/explore/css/scroll',
    name: 'scrollBar',
    component: scrollBar
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
  },
  chart: {
    path: '/practice/other/chart',
    name: 'chart',
    component: chart
  }
}
