// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import callApi from './resource/api.js'
import 'element-ui/lib/theme-chalk/index.css'
import componentList from './components/upload/component.js'
Vue.config.productionTip = false
Vue.prototype.$callApi = callApi
Vue.use(ElementUI, { size: 'medium' })
Vue.component('guan', {
  template: '<h1>官万晓</h1>'
})
componentList.forEach(component => {
  Vue.component(component.name, component)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
