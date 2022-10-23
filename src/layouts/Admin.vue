<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar />
      <header-stats />
      <!-- md:px-10 mx-auto -->
      <div class="px-4 bg-orange-500 w-full h-full pt-24" id="main">
        <router-view />
        <footer-admin />
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue"
import HeaderStats from "@/components/Headers/HeaderStats.vue"
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import FooterAdmin from "@/components/Footers/FooterAdmin.vue"
export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    HeaderStats,
    Sidebar,
    FooterAdmin,
  },
}
</script>

<style scoped>
#main {
  height: 95vh;
}
</style>
