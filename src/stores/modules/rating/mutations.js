export default {
  SET_RATING_MUTATIONS(state, { field, value }) {
    state[field] = value
  },

  ADD_RATING_ERRORS(state, { error }) {
    state.error.push(error)
  },
}
