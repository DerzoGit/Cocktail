import { createStore } from 'vuex'

export default createStore({
  state: {
    infoState: "testState",
    users: [
      { id: 0, name: "Jane" },
      { id: 1, name: "Jon" }
    ],
    notifDisplay: false,
    notifMessage: ""
  },
  getters: {
    getJane(state) {
      return state.users[0].name
    },
    getUser: (state) => (id) => {
      return state.users[id].name
    },
    getNotif: (state) => {
      return state.notifDisplay
    },
    getNotifMessage: (state) => {
      return state.notifMessage
    }
  },
  mutations: {
    changeJane(state, value) {
      state.users[0].name = value
    },
    displayNotif(state, payload) {
      state.notifDisplay = payload.display
      state.notifMessage = payload.message
    }
  },
  actions: {
    modify(context, value) {
      console.log(context)
      context.commit("changeJane", value)
    }
  },
  modules: {
  }
})
