import axios from "axios"

export default {
  FETCH_STORE_ACTION({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_STORE_MUTATIONS", { field: "isLoading", value: true })
      commit("SET_STORE_MUTATIONS", { field: "isError", value: false })

      // let corsAnywhere = "https://corsanywhere.herokuapp.com"
      // `${corsAnywhere}/https://0l89uhx5f4.execute-api.ap-southeast-1.amazonaws.com/dev/users`
      return axios

        .get(`http://localhost:8080/dev/users`)
        .then((res) => {
          const response = res.data
          commit("SET_STORE_MUTATIONS", {
            field: "storesDetails",
            value: response,
          })
          commit("SET_STORE_MUTATIONS", { field: "isLoading", value: false })

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
}
