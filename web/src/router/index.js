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
      },
      {
        path: "article/:id",
        name: "article",
        props: true,
        component: () => import("../views/Article.vue")
      }
    ]
  },
  {
    path: "/hero/:id",
    name: "hero",
    props: true,
    component: () => import("../views/Hero.vue")
  }
]

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'history' : '', // 后端支持可开
  base: process.env.NODE_ENV === 'production' ? '/GOK-Web' : '',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
