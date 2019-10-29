import Vue from "vue"
import "./plugins/axios"
import App from "./App.vue"
import "./plugins/element.js"
import router from "./router"

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload"
    }
  },
  methods: {
    getAuthHeaders() {
      const tokenData = JSON.parse(localStorage.getItem("userData"))

      return {
        Authorization: `Bearer ${(tokenData && tokenData.token) || ""}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
