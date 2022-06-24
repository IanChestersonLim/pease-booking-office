<script setup lang="ts">
import type { SalesOrderInterface } from "@/interfaces/salesOrder";
import { ref } from "vue";
import { useStore } from "vuex";
import SalesOrderFormComponent from "../components/SalesOrderFormComponent.vue";

const store = useStore();
const props = defineProps(["id"]);

const salesOrder = ref();

store.dispatch("GET_SALES_ORDERS").then(() => {
  salesOrder.value = store.state.salesOrders.filter(
    (so: SalesOrderInterface) => props.id === so._id
  )[0];
});
</script>
<template><SalesOrderFormComponent :sales-order="salesOrder" /></template>
<style scoped></style>
