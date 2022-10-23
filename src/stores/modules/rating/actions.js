import axios from "axios"

export default {
  FETCH_STORE_ACTION({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_STORE_MUTATIONS", { field: "isLoading", value: true })
      commit("SET_STORE_MUTATIONS", { field: "isError", value: false })

      return axios
        .get(
          "https://0l89uhx5f4.execute-api.ap-southeast-1.amazonaws.com/dev/users"
        )
        .then((res) => {
          const response = res.data
          console.log(response)
          commit("SET_STORE_MUTATIONS", {
            field: "storesDetails",
            value: response,
          })
          resolve(response)
        })
        .catch((err) => {
          console.error(err)
          commit("SET_STORE_MUTATIONS", { field: "isError", value: true })
          commit("ADD_STORE_ERRORS", { field: "error", value: err })
          reject(err)
        })
    })
  },

  SET_RATING_ACTION({ commit }, { field, value }) {
    // console.log(
    //   "🚀 ~ file: actions.js ~ line 32 ~ SET_RATING_ACTION ~ value",
    //   value,
    //   field
    // )

    if (field === "selectedStore") {
      commit("SET_RATING_MUTATIONS", {
        field: "selectedStore",
        value,
      })
      commit("SET_RATING_MUTATIONS", { field: "selectedEmployee", value: null })
      commit("SET_RATING_MUTATIONS", { field: "ratingValue", value: null })
    }

    if (field === "selectedEmployee") {
      commit("SET_RATING_MUTATIONS", {
        field: "selectedEmployee",
        value,
      })
    }

    if (field === "ratingValue") {
      commit("SET_RATING_MUTATIONS", {
        field: "ratingValue",
        value,
      })
    }
  },
}