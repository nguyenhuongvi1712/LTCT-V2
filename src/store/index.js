import { createStore } from 'vuex'

const authStore = {
  namespaced: true,
  state: {
    user: null,
    token: '',
    isAuthenticated: false,
  },
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
    isAuthenticated: (state) => state.isAuthenticated,
  },
  mutations: {
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.token = ''
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    login(state, req) {
      const { user } = req
      if (user.role === 'admin' || user.role === 'shipper') {
        state.isAuthenticated = true
        state.user = { ...user }
        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
  },
}

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    authStore,
  },
})
