import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"
import CategoryEdit from "../views/CategoryEdit.vue"
import ItemEdit from "../views/ItemEdit.vue"
import HeroEdit from "../views/HeroEdit.vue"
import ArticleEdit from "../views/ArticleEdit.vue"
import AdEdit from "../views/AdEdit.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      {
        path: "categories/create",
        component: CategoryEdit
      },
      {
        path: "categories/edit/:id",
        component: CategoryEdit,
        props: true
      },
      {
        path: "categories/list",
        component: () => import("../views/CategoryList.vue")
      },
      {
        path: "items/create",
        component: ItemEdit
      },
      {
        path: "items/edit/:id",
        component: ItemEdit,
        props: true
      },
      {
        path: "items/list",
        component: () => import("../views/ItemList.vue")
      },
      {
        path: "heroes/create",
        component: HeroEdit
      },
      {
        path: "heroes/edit/:id",
        component: HeroEdit,
        props: true
      },
      {
        path: "heroes/list",
        component: () => import("../views/HeroList.vue")
      },
      {
        path: "articles/create",
        component: ArticleEdit
      },
      {
        path: "articles/edit/:id",
        component: ArticleEdit,
        props: true
      },
      {
        path: "articles/list",
        component: () => import("../views/ArticleList.vue")
      },

      {
        path: "ads/create",
        component: AdEdit
      },
      {
        path: "ads/edit/:id",
        component: AdEdit,
        props: true
      },
      {
        path: "ads/list",
        component: () => import("../views/AdList.vue")
      }
    ]
  }
  // {
  //   path: "/main",
  //   name: "main",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/Main.vue")
  // }
]

const router = new VueRouter({
  routes
})

// 解决 Navigating to current location ("/categories/list") is not allowed bug
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
