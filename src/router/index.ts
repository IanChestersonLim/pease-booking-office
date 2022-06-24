import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SalesOrderView from "@/views/SalesOrderView.vue";
import EditSalesOrderView from "@/views/EditSalesOrderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component:
        localStorage.getItem("isLoggedIn") === "true" ? HomeView : LoginView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/sales-orders/",
      name: "sales-orders",
      component:
        localStorage.getItem("isLoggedIn") === "true" ? HomeView : LoginView,
      props: true,
    },
    {
      path: "/sales-orders/:id",
      name: "sales-order",
      component:
        localStorage.getItem("isLoggedIn") === "true"
          ? SalesOrderView
          : LoginView,
      props: true,
    },
    {
      path: "/sales-orders/edit/:id",
      name: "edit-sales-order",
      component:
        localStorage.getItem("isLoggedIn") === "true"
          ? EditSalesOrderView
          : HomeView,
      props: true,
    },
  ],
});

export default router;
