// vue.config.js
module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: process.env.VUE_APP_API_URL_PROXY,
  },
}
