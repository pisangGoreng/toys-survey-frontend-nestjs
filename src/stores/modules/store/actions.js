// import axios from "axios"

export default {
  fetch() {},

  // SET ACTIVE LOCATION FROM SEARCH BAR
  async setActiveLocation({ commit }, { longitude, latitude }) {
    commit("SET_ACTIVE_LOCATION", { latitude, longitude })
  },
}
