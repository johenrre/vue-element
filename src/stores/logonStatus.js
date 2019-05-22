import Cookies from 'js-cookie'
const state = {
  userToken: ''
}

const getters = {
  getUserToken: state => {
    if (!state.userToken) {
      state.userToken = Cookies.get('userToken')
    }
    return state.userToken
  }
}
// action 可以进行异步操作
const actions = {}

const mutations = {
  setUserToken (state, tokens) {
    state.userToken = tokens
    Cookies.set('userToken', tokens)
  },
  removeUserToken (state, cookName) {
    state.userToken = ''
    Cookies.remove(cookName)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
