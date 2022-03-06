import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.js'
import './assets/icon/icon.css'
import NProgress from 'nprogress' // 引入nprogress插件（加载进度条）
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:5001/'

// axios请求拦截器
axios.interceptors.request.use(
  config => {
    NProgress.start() // 设置加载进度条(开始..)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// axios响应拦截器
axios.interceptors.response.use(
  function(response) {
    NProgress.done() // 设置加载进度条(结束..)
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

//token添加到请求头
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config;
}, function (error) {
  return Promise.reject(error);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
