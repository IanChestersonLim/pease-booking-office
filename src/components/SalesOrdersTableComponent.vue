<script setup lang="ts">
import moment from "moment";

const props = defineProps(["salesOrders"]);
</script>
<template>
  <table v-if="props.salesOrders" class="table">
    <thead>
      <th>Date</th>
      <th>SO #</th>
      <th>Customer</th>
      <th>Address</th>
      <th>Sales Rep</th>
      <th style="width: 10ch">Items</th>
      <th>Note</th>
    </thead>
    <tbody>
      <tr v-for="(salesOrder, index) in props.salesOrders" :key="index">
        <td>{{ moment(salesOrder.date).format("MM-DD-YYYY") }}</td>
        <td>{{ salesOrder.salesOrderId }}</td>
        <td>{{ salesOrder.customer }}</td>
        <td>{{ salesOrder.address }}</td>
        <td>{{ salesOrder.salesRep }}</td>
        <td>{{ salesOrder.salesOrderItems.length }}</td>
        <td>{{ salesOrder.note }}</td>
        <td>
          <RouterLink
            :to="{ name: 'sales-order', params: { id: salesOrder._id } }"
            >View</RouterLink
          >
        </td>
        <td>
          <RouterLink
            :to="{ name: 'edit-sales-order', params: { id: salesOrder._id } }"
            >Edit</RouterLink
          >
        </td>
      </tr>
    </tbody>
  </table>
  <h1 v-else>Loading...</h1>
</template>
<style scoped></style>
