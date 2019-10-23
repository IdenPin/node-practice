import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      {
        path: "categories/create",
        component: () => import("../views/CategoryEdit.vue")
      },
      {
        path: "categories/list",
        component: () => import("../views/CategoryList.vue")
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
