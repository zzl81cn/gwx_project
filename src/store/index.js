import Vuex from 'vuex'
import Vue from 'vue'
import axiosModule from './axios'
Vue.use(Vuex)
const state = {
  number: 2018
}
// 生成vuex实例
export default new Vuex.Store({ state, modules: { axiosModule } })
