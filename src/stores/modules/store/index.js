import actions from "./actions"
import mutations from "./mutations"

export default {
  state: () => ({
    isLoading: false,
    isError: false,
    error: [],
    storesDetails: [],
  }),
  getters: {},
  actions,
  mutations,
}
