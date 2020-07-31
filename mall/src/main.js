import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import env from './env'

let mock = true;
if (mock) {
    require('../public/mock/user/api')
}

axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = env.baseURL;
axios.defaults.timeout = 8000;

axios.interceptors.response.use(res => {
    let res_ = res.data;
    if (res_.status === 0) {
        return res_.data
    } else if (res_.status === 10) {
        window.location.href = '/login';
    } else {
        alert(res_.msg)
    }
})

Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad, {
    loading: '/imgs/loading-svg/loading-bubbles.svg'
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')