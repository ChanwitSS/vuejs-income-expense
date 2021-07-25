import Vue from 'vue'
import Vuex from 'vuex'
import dataFile from '@/json/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    balance: 0,
  },
  getters: {
    records: (state) => state.data,
  },
  mutations: {
      fetch(state, { res }) {
        state.data = res
      },
      add(state, { payload }){
        state.data.push(payload)
      },
      edit(state, { payload }) {
        state.data[payload.index].name = payload.name
        state.data[payload.index].date = payload.date
        state.data[payload.index].value = payload.value
        state.data[payload.index].type = payload.type
      }
  },
  actions: {
    async fetchRecord({ commit }) {
        let res = dataFile
        commit("fetch", { res })
    },
    addRecord({ commit }, payload) {
      commit("add", { payload })
    },
    editRecord({ commit }, payload) {
      commit("edit", { payload })
    },
  },
  modules: {
  }
})
