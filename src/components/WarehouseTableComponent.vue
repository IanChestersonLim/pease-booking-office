<script setup lang="ts">
const props = defineProps(["items", "warehouse"]);
</script>
<template>
  <h2>{{ props.warehouse }}</h2>
  <table class="table table-responsive table-striped table-hover">
    <thead>
      <th style="width: 20%">Code</th>
      <th style="width: 50%">Item Description</th>
      <th>Unit Measure</th>
      <th>Quantity</th>
    </thead>
    <tbody>
      <tr v-for="(soItem, index) in props.items" :key="index">
        <td>{{ soItem.item.code }}</td>
        <td>{{ soItem.item.description }}</td>
        <td>{{ soItem.um }}</td>
        <td>{{ soItem.quantity }}</td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped></style>
