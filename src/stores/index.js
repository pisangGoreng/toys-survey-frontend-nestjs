import { createStore } from "vuex"
import VuexPersistence from "vuex-persist"

import store from "./modules/store"

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default createStore({
  modules: {
    store,
  },
  state: () => {},
  actions: {},
  mutations: {},
  plugins: [vuexLocal.plugin],
})
