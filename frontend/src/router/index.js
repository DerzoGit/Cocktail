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
      { path: "users/index", component: Admin.UserIndex },
      { path: "users/edit/:id(\\d+)", component: Admin.UserEdit, props: true },
      { path: "users/add", component: Admin.UserAdd },

      { path: "cocktails/index", component: Admin.CocktailIndex },
      { path: "cocktails/edit/:id", component: Admin.CocktailEdit },
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

router.beforeEach((to, from, next) => {
  if(to.matched[0].name == "admin") {
    authGard()
  }
  next()
})

export default router
