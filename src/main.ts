import { createApp } from "vue";
import { createStore } from "vuex";
import axios from "axios";

import App from "./App.vue";
import type { SalesOrderInterface } from "./interfaces/salesOrder";
import router from "./router";

const app = createApp(App);

app.use(router);

interface StateInterface {
  accessToken: string;
  isLoggedIn: boolean;
  salesOrders: SalesOrderInterface[];
  items: [];
  customers: [];
}

const store = createStore<StateInterface>({
  state: {
    accessToken: localStorage.getItem("accessToken") || "",
    isLoggedIn: false,
    salesOrders: [],
    items: [],
    customers: [],
  },
  actions: {
    LOG_IN({ commit }, payload) {
      commit("SET_LOG_IN", true);
      commit("SET_ACCESS_TOKEN", payload.accessToken);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("accessToken", payload.accessToken);
    },
    LOG_OUT({ commit }) {
      commit("SET_LOG_IN", false);
      commit("SET_ACCESS_TOKEN", "");
      localStorage.clear();
    },
    async GET_SALES_ORDERS({ commit }) {
      await axios
        .get("https://pease-booking-server.herokuapp.com" + "/sales-orders", {
          headers: {
            authorization: "Bearer " + store.state.accessToken,
          },
        })
        .then((res: any) => {
          commit("SET_SALES_ORDERS", res.data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    },
    async GET_ITEMS({ commit }) {
      await axios
        .get("https://pease-booking-server.herokuapp.com" + "/items", {
          headers: {
            authorization: "Bearer " + store.state.accessToken,
          },
        })
        .then((res: any) => {
          commit("SET_ITEMS", res.data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    },
    async GET_CUSTOMERS({ commit }) {
      await axios
        .get("https://pease-booking-server.herokuapp.com" + "/customers", {
          headers: {
            authorization: "Bearer " + store.state.accessToken,
          },
        })
        .then((res: any) => {
          commit("SET_CUSTOMERS", res.data);
        })
        .catch((err: any) => {
          console.error(err);
        });
    },
  },
  mutations: {
    SET_LOG_IN(state, payload) {
      state.isLoggedIn = payload;
    },
    SET_ACCESS_TOKEN(state, payload) {
      state.accessToken = payload;
    },
    SET_SALES_ORDERS(state, payload) {
      state.salesOrders = payload;
    },
    SET_ITEMS(state, payload) {
      state.items = payload;
    },
    SET_CUSTOMERS(state, payload) {
      state.customers = payload;
    },
  },
});

app.use(store);
app.mount("#app");
