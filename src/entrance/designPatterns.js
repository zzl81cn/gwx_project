// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../App'
// 引入路由页面
import router from '../router/designPatterns'
import ElementUI from 'element-ui'
import callApi from '../resource/api.js'
import store from '../store'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex实例注入vue实例中
import Vuex from 'vuex'
import { ToastPlugin, WechatPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
Vue.use(WechatPlugin) //  微信
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.config.productionTip = false
Vue.prototype.$callApi = callApi
Vue.use(ElementUI, { size: 'medium' })
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
