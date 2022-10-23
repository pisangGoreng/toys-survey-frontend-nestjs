import { createApp } from "vue"
// import vSelect from "vue-select"
// import "vue-select/dist/vue-select.css"
import { createWebHistory, createRouter } from "vue-router"

// styles
import "@fortawesome/fontawesome-free/css/all.min.css"
import "@/assets/styles/tailwind.css"

// mouting point for the whole app
import App from "@/App.vue"

// layouts
import Admin from "@/layouts/Admin.vue"

// views for Admin layout
import Dashboard from "@/views/admin/Dashboard.vue"
import Settings from "@/views/admin/Settings.vue"
import Tables from "@/views/admin/Tables.vue"
import Maps from "@/views/admin/Maps.vue"

import stores from "./stores"

// routes
const routes = [
  {
    path: "/",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(stores).use(router).mount("#app")
