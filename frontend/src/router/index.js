import { createRouter, createWebHistory } from 'vue-router'

import * as Public from "@/views/public"

import * as Admin from "@/views/admin"

import Login from "@/views/auth/Login"

import { authGard } from "@/_helpers/auth-gard"

const routes = [
  {
    path: "/",
    name: "public",
    component: Public.PublicLayout,
    children: [
      { path: "/", name: "home", component: Public.Home },
      { path: "/cocktails", name: "cocktails", component: Public.Cocktail },
      { path: "/contact", name: "contact", component: Public.Contact }
    ]
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin.AdminLayout,
    children: [
      { path: "dashboard", name: "dashboard", component: Admin.Dashboard },
      { path: "users/index", name: "userIndex", component: Admin.UserIndex },
      // :id(\\d+) > l'id est un ou plusieurs digit
      { path: "users/edit/:id(\\d+)", name: "userEdit", component: Admin.UserEdit, props: true },
      { path: "users/add", component: Admin.UserAdd },

      { path: "cocktails/index", name: "cocktailIndex", component: Admin.CocktailIndex },
      // :id(\\d+)? > l'id est un, plusieurs digit ou peut être inexistant
      { path: "cocktails/edit/:id(\\d+)?", name:"cocktailEdit", component: Admin.CocktailEdit, props: true },
      { path: "/:pathMatch(.*)*", redirect: "/admin/dashboard" }
    ]
  },
  { 
    path: "/login", name: "login", component: Login
  },
  {
    path: "/:pathMatch(.*)*", redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Verrouillage partie admin via Token avec authGard
router.beforeEach((to, from, next) => {
  if(to.matched[0].name == "admin") {
    authGard()
  }
  next()
})

export default router
