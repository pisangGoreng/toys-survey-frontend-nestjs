import axios from "axios"

export default {
  FETCH_STORE_ACTION({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_STORE_MUTATIONS", { field: "isLoading", value: true })
      commit("SET_STORE_MUTATIONS", { field: "isError", value: false })
      // let corsAnywhere = "https://corsanywhere.herokuapp.com"
      // `${corsAnywhere}/https://0l89uhx5f4.execute-api.ap-southeast-1.amazonaws.com/dev/users`
      // .get(`https://toys-survey-frontend-nestjs.vercel.app/dev/users`)

      console.log("USE VUE_APP_BASE_URL ", process.env.VUE_APP_BASE_URL)
      console.log(
        "USE VUE_APP_API_URL_PROXY",
        process.env.VUE_APP_API_URL_PROXY
      )
      return axios
        .get(`${process.env.VUE_APP_BASE_URL}dev/users`)
        .then((res) => {
          const response = res.data
          console.log(
            "🚀 ~ file: actions.js ~ line 21 ~ .then ~ response",
            response
          )
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
