import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    records: (state) => state.data
  },
  mutations: {
      fetch(state, { res }) {
        state.data = res
      },
      add(state, { payload }){
        state.data.push(payload)
      },
      edit (state, { payload }) {
        state.data[payload.index].name = payload.name
        state.data[payload.index].type = payload.type
      }
  },
  actions: {
    async fetchRecord({ commit }) {
        let res = [
            {
                name: 'Salary',
                type: 'Income',
                date: '01/7/2564',
                value: 100
            },
            {
                name: 'Food',
                type: 'Expense',
                date: '02/7/2564',
                value: 25000
            },
        ]

        commit("fetch", { res })
    },
    addRecord({ commit }, payload) {
      commit("add", { payload })
    },
    editRecord({ commit }, payload) {
      commit("edit", { payload })
    }
  },
  modules: {
  }
})
