import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Main from "../views/Main.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "home",
    children: [
      {
        path: "home",
        name: "home",
        component: Home
      },
      {
        path: "attackCenter",
        name: "attackCenter",
        component: () => import("../views/AttackCenter.vue")
      },
      {
        path: "matchCenter",
        name: "matchCenter",
        component: () => import("../views/MatchCenter.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
