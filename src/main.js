import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/reset.css'
import './assets/css/border.css'
import './assets/js/rem.js'
import './assets/iconfont/iconfont.css'
import axios from 'axios'
import Loading from './components/Loading.vue'
import ToastPlugin from './plugins/Toast.js'
// import Vconsole from 'vconsole' //移动端控制台插件

// new Vconsole()

Vue.use(ToastPlugin)

Vue.use(Loading)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
//设置默认url地址 在vue.config.js里配置地址代理把碰到/api的地址代理成要去的地址
axios.defaults.baseURL = '/api'
//接口拦截 返回处理过滤后的数据
axios.interceptors.response.use(response => {
  // console.log(response)
  const res = response.data
  if (res.status === 1) {//请求成功 把data给过滤掉
    return res.data
  } else if (res.status === 0) {//请求失败 
    console.error(res)
    return Promise.reject(res)
  }
}, error => {
  console.error(error)
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
