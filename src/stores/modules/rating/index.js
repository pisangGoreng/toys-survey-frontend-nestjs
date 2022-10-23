import actions from "./actions"
import mutations from "./mutations"

export default {
  state: () => ({
    isLoading: false,
    isError: false,
    error: [],
    selectedEmployee: null,
    selectedStore: null,
    ratingValue: null,
  }),
  getters: {
    ratingGetters: (state) => {
      return () => {
        return {
          ...state,
        }
      }
    },
  },
  actions,
  mutations,
}
