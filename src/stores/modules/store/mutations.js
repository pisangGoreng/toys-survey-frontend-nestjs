export default {
  SET_STORE_MUTATIONS(state, { field, value }) {
    state[field] = value
  },

  ADD_STORE_ERRORS(state, { error }) {
    state.error.push(error)
  },
}
