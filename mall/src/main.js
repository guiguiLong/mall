import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message, ColorPicker } from 'element-ui'
import { Button } from 'element-ui'
import { Dialog } from 'element-ui'
import { Cascader } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'default-passive-events'
import App from './App.vue'
import store from './store'
import router from './router'
import currency from './util/filters'

Object.keys(currency).forEach(k => Vue.filter(k, currency[k]));
Vue.prototype.$message = Message

Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Cascader)
Vue.use(VueLazyLoad, {
    loading: '/imgs/loading-svg/loading-bubbles.svg'
})

let mock = true;
if (mock) {
    require('../public/mock/user/api')
}

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;

axios.interceptors.response.use(res => {
    let res_ = res.data,
        path = location.pathname;

    if (res_.status === 0) {
        return res_.data
    } else if (res_.status === 10) {
        if (!window.location.href.includes('/login') && path !== '/index') {
            window.location.href = '/login';
        }
        return Promise.reject(res_.msg)
    } else {
        Message.error(res_.msg)
        return Promise.reject(res_.msg)
    }
}, err => {
    if (err) {
        if (err.response) {
            Message.error(err.response.data.message || '网络繁忙,请稍后再试')
        }
    }
    return Promise.reject(err)
})

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')