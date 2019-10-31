import Vue from "vue"
import App from "./App.vue"
Vue.config.productionTip = false
import VueAwesomeSwiper from "vue-awesome-swiper"
import "swiper/dist/css/swiper.css"
import Card from "./components/Card"
import ListCard from "./components/ListCard"
Vue.component("m-card", Card)
Vue.component("m-list-card", ListCard)
Vue.use(VueAwesomeSwiper /* { default global options } */)
import "./styles/index.scss"
import router from "./router"

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
