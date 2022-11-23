import { createStore } from 'vuex'

export default createStore({
  state: {
    infoState: "testState",
    users: [
      { id: 0, name: "Jane" },
      { id: 1, name: "Jon" }
    ]
  },
  getters: {
    getJane(state) {
      return state.users[0].name
    },
    getUser: (state) => (id) => {
      return state.users[id].name
    }
  },
  mutations: {
    changeJane(state, value) {
      state.users[0].name = value
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
