import Vue from "vue"
import './plugins/axios'
import App from "./App.vue"
Vue.config.productionTip = false
import VueAwesomeSwiper from "vue-awesome-swiper"
import "swiper/dist/css/swiper.css"
import Card from "./components/Card"
import ListCard from "./components/ListCard"
import Element from "element-ui"
import store from "./store"
Vue.component("m-card", Card)
Vue.component("m-list-card", ListCard)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(Element)
import "./styles/index.scss"
import router from "./router"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
