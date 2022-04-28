import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存放的键值对就是所要管理的状态
    token: '',
    // 用户的数据
    username: '',
    nickname: '',
    photo: '',
    sex: ''
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    del_token(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    set_username(state, username) {
      state.username = username
      localStorage.setItem('username', username)
    },
    // set_nickname(state, nickname) {
    //   state.nickname = nickname
    // },
    // set_photo(state, photo) {
    //   state.photo = photo
    // },
    // set_sex(state, sex) {
    //   state.sex = sex
    // }
  },
  actions: {
  },
  modules: {
  }
})
