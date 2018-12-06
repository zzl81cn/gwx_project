import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const setMap = resolve =>
  require.ensure([], () => resolve(require('@/page/modules/es6/setMap')), 'es6')
const proxy = resolve =>
  require.ensure([], () => resolve(require('@/page/modules/es6/proxy')), 'es6')
const promise = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/es6/promise')),
    'es6'
  )
const axios = resolve =>
  require.ensure([], () => resolve(require('@/page/modules/axios')), 'axios')
const callHook = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/explore/callHook')),
    'explore'
  )
const border = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/explore/css/border')),
    'explore'
  )
const grid = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/explore/css/grid')),
    'explore'
  )
const vuxInput = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/vueApi/vModel/input')),
    'vueApi'
  )

const vModel = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/vueApi/vModel')),
    'vueApi'
  )
const replace = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/regExp/replace')),
    'regExp'
  )
const reverseNumber = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/practice/string/reverseNumber')),
    'practice'
  )
const zeroCount = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/practice/number/zeroCount')),
    'practice'
  )
const twoPoint = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/practice/array/twoPoint')),
    'practice'
  )
const radio = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/practice/other/radio')),
    'practice'
  )
const mixins = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/practice/other/mixins')),
    'practice'
  )
const hoc = resolve =>
  require.ensure(
    [],
    () => resolve(require('@/page/modules/practice/other/hoc')),
    'practice'
  )
export default {
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
  border: {
    path: '/explore/css/border',
    name: 'border',
    component: border
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
  }
}
