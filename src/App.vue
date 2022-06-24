<script setup lang="ts">
import { useStore } from "vuex";
import { RouterLink, RouterView, useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const handleLogout = () => {
  store.dispatch("LOG_OUT");
  router.push({ name: "login" });
};
</script>

<template>
  <header class="no-print">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <RouterLink class="navbar-brand" to="/">Home</RouterLink>
      <ul class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <RouterLink class="nav-link disabled" to="/customers"
            >View Customers</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link disabled" to="/customers/add"
            >Add Customer</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link disabled" to="/items"
            >View Items</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link disabled" to="/items/add"
            >Add Item</RouterLink
          >
        </li> -->
        <li class="nav-item" @click="handleLogout">
          <span class="nav-link" style="cursor: pointer">Log Out</span>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

@media print {
  .no-print {
    display: none !important;
  }

  table {
    font-size: 10px;
  }
}
</style>
