<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";

import SearchComponent from "@/components/SearchComponent.vue";
import DateRangeComponent from "@/components/DateRangeComponent.vue";
import SalesOrdersTableComponent from "@/components/SalesOrdersTableComponent.vue";

import type { SalesOrderInterface } from "@/interfaces/salesOrder";

const store = useStore();

const salesOrders = ref<SalesOrderInterface[]>();
const filtered = ref<SalesOrderInterface[]>();

const searchTerm = ref("");
const from = ref(moment().subtract(1, "M").format("YYYY-MM-DD"));
const to = ref(moment().format("YYYY-MM-DD"));

const handleSearchChange = (term: string) => {
  searchTerm.value = term;
  handleChange();
};

const handleDateChange = (type: string, date: string) => {
  if (type === "TO") to.value = moment(date).format("YYYY-MM-DD");
  if (type === "FROM") from.value = moment(date).format("YYYY-MM-DD");
  handleChange();
};

const handleChange = () => {
  const terms = searchTerm.value.split(" ");
  filtered.value = salesOrders.value;

  // filter by date
  filtered.value = filtered.value?.filter((salesOrder: SalesOrderInterface) => {
    if (
      moment(salesOrder.date).format("YYYY-MM-DD") >= from.value &&
      moment(salesOrder.date).format("YYYY-MM-DD") <= to.value
    )
      return salesOrder;
  });

  terms.forEach((term: string) => {
    filtered.value = filtered.value?.filter(
      (salesOrder: SalesOrderInterface) => {
        if (
          salesOrder.salesOrderId
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase())
        )
          return salesOrder;
        if (
          salesOrder.customer
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase())
        )
          return salesOrder;
        if (
          salesOrder.address
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase())
        )
          return salesOrder;
        if (
          salesOrder.salesRep
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase())
        )
          return salesOrder;
        if (
          salesOrder.note.toString().toLowerCase().includes(term.toLowerCase())
        )
          return salesOrder;
      }
    );
  });
};

store.dispatch("GET_SALES_ORDERS").then(() => {
  salesOrders.value = store.state.salesOrders;
  handleChange();
});

setInterval(() => {
  store.dispatch("GET_SALES_ORDERS").then(() => {
    salesOrders.value = store.state.salesOrders;
    handleChange();
  });
}, 60000);
</script>
<template>
  <div class="container">
    <SearchComponent :handle-change="handleSearchChange" />
    <DateRangeComponent :handle-change="handleDateChange" />
    <SalesOrdersTableComponent :sales-orders="filtered" />
  </div>
</template>
<style scoped></style>
