import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    username: '',
    cartcount: 0,
    productinfo: {}
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})