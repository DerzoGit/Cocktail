import { createRouter, createWebHistory } from 'vue-router'

import Home from "@/views/public/Home"
import Cocktail from "@/views/public/Cocktail"
import Contact from "@/views/public/Contact"

import PublicLayout from "@/views/public/Layout"

const routes = [
  {
    path: "/",
    name: "public",
    component: PublicLayout,
    children: [
      { path: "/", name: "home", component: Home },
      { path: "/cocktails", name: "cocktails", component: Cocktail },
      { path: "/contact", name: "contact", component: Contact }
    ]
  },
  {
    path: "/:pathMatch(.*)*", redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
