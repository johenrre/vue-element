import Vue from 'vue'
import Vuex from 'vuex'
import logonStatus from './stores/logonStatus'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    logonStatus
  }
})
