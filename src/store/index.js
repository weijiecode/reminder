import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存放的键值对就是所要管理的状态
    token: '',
    // 用户的数据
    username: ''
  },
  mutations: {
    set_token(state,token) {
      state.token = token
      localStorage.token = token
    },
    del_token(state) {
      state.token = ''
      localhost.removeItem('token')
    },
    set_username(state,username) {
      state.username = username
      localStorage.username = username
    }
  },
  actions: {
  },
  modules: {
  }
})
