import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'

Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
    loading: '/imgs/loading-svg/loading-bubbles.svg'
})

let mock = false;
if (mock) {
    require('../public/mock/user/api')
}

axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = env.baseURL;
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
        alert(res_.msg);
        return Promise.reject(res_.msg)
    }
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')