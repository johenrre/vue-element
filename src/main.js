import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import axios from 'axios'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import { post, get, patch, put } from './utils/http'
import Cookies from 'js-cookie'
import md5 from 'js-md5'
// import "./registerServiceWorker";
import './assets/css/element-variables.scss' // 自定义主题
import 'normalize.css'
import './assets/font/iconfont.css'

Vue.prototype.Cookies = Cookies
Vue.prototype.$md5 = md5
Vue.prototype.$echarts = echarts
Vue.prototype.$base64 = require('js-base64').Base64

// 配置的代理
Vue.prototype.HOST = '/api'
// 定义全局变量
Vue.prototype.$axios = axios
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.use(ElementUI, { zIndex: 3000 })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
