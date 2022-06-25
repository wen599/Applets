
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { $http } from '@escook/request-miniprogram'
import request from '@/request/request.js'

$http.baseUrl = 'https://api-ugo-web.itheima.net/'
$http.beforeRequest=(options)=>{
	uni.showLoading({
		title:"数据加载中"
	})
}
$http.afterRequest=(options)=>{
	uni.hideLoading()
}
uni.$http = $http
uni._request=request
App.mpType = 'app'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif