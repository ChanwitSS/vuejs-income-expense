import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    records: (state) => state.data,
    balance: (state) => state.data.map((item, index) => {
      var balance = 0
      if (state.data.type == 'income') {
        balance += item.value;
      }else {
        balance -= item.value;
      }
      return balance;
    }),
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
        state.data[payload.index].date = payload.date
        state.data[payload.index].value = payload.value
        state.data[payload.index].type = payload.type
      }
  },
  actions: {
    async fetchRecord({ commit }) {
        let res = [
            {
                name: 'Salary',
                type: 'income',
                date: '2021-07-24',
                value: 100
            },
            {
                name: 'Food',
                type: 'expense',
                date: '2021-07-24',
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
