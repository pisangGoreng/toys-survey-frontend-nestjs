import { createStore } from "vuex"

import store from "./modules/store"
import rating from "./modules/rating"

export default createStore({
  modules: {
    store,
    rating,
  },
  state: () => {},
  actions: {},
  mutations: {},
})
