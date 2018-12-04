import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const setMap = resolve =>
  require.ensure([], () => resolve(require('@/page/modules/es6/setMap')), 'es6')
const proxy = resolve =>
  require.ensure([], () => resolve(require('@/page/modules/es6/proxy')), 'es6')
export default {
  setmap: {
    path: '/es6/setmap',
    name: 'setMap',
    component: setMap
  },
  proxy: {
    path: '/es6/proxy',
    name: 'proxy',
    component: proxy
  }
}
