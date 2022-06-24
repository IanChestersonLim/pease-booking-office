<script setup lang="ts">
import type { SalesOrderInterface } from "@/interfaces/salesOrder";
import { ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import type { ItemInterface } from "@/interfaces/item";
import WarehouseTableComponent from "../components/WarehouseTableComponent.vue";

const props = defineProps(["id"]);
const store = useStore();
const salesOrder = ref<SalesOrderInterface>();
const warehouse1 = ref<ItemInterface[]>([]);
const warehouse2 = ref<ItemInterface[]>([]);
const warehouse3 = ref<ItemInterface[]>([]);
const warehouse4 = ref<ItemInterface[]>([]);
const others = ref<ItemInterface[]>([]);

const handlePrint = () => {
  window.print();
};

store.dispatch("GET_SALES_ORDERS").then(() => {
  salesOrder.value = store.state.salesOrders.filter(
    (salesOrder: SalesOrderInterface) => salesOrder._id === props.id
  )[0];
  if (salesOrder.value && salesOrder.value.salesOrderItems) {
    salesOrder.value.salesOrderItems.forEach((soItem: ItemInterface) => {
      if (soItem.item.groupId === 20 || soItem.item.groupId === 15392)
        return warehouse1.value.push(soItem);
      if (
        soItem.item.groupId === 17 ||
        soItem.item.groupId === 14 ||
        soItem.item.groupId === 11 ||
        soItem.item.groupId === 3 ||
        soItem.item.groupId === 96 ||
        soItem.item.groupId === 5378 ||
        soItem.item.groupId === 12125
      )
        return warehouse2.value.push(soItem);
      if (
        soItem.item.groupId === 1 ||
        soItem.item.groupId === 12 ||
        soItem.item.groupId === 14 ||
        soItem.item.groupId === 6658
      )
        return warehouse3.value.push(soItem);
      if (
        soItem.item.groupId === 15 ||
        soItem.item.groupId === 7 ||
        soItem.item.groupId === 8 ||
        soItem.item.groupId === 6 ||
        soItem.item.groupId === 5 ||
        soItem.item.groupId === 2 ||
        soItem.item.groupId === 3549 ||
        soItem.item.groupId === 12493 ||
        soItem.item.groupId === 7304 ||
        soItem.item.groupId === 8804 ||
        soItem.item.groupId === 12633 ||
        soItem.item.groupId === 13748 ||
        soItem.item.groupId === 16070 ||
        soItem.item.groupId === 16587 ||
        soItem.item.groupId === 17017
      )
        return warehouse4.value.push(soItem);
      return others.value.push(soItem);
    });
  }
});
</script>
<template>
  <div v-if="salesOrder">
    <h1>Sales Order</h1>
    <button type="button" class="btn btn-primary no-print" @click="handlePrint">
      Print
    </button>
    <div class="row">
      <div class="col">
        <p><b>Customer:</b> {{ salesOrder.customer }}</p>
      </div>
      <div class="col">
        <p><b>Date:</b> {{ moment(salesOrder.date).format("MM-DD-YYYY") }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p><b>Address:</b> {{ salesOrder.address }}</p>
      </div>
      <div class="col">
        <p><b>SO #:</b> {{ salesOrder.salesOrderId }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p><b>Sales Rep:</b> {{ salesOrder.salesRep }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p><b>Note:</b> {{ salesOrder.note }}</p>
      </div>
    </div>

    <WarehouseTableComponent
      v-if="warehouse1.length"
      :items="warehouse1"
      warehouse="Warehouse 1"
    />
    <WarehouseTableComponent
      v-if="warehouse2.length"
      :items="warehouse2"
      warehouse="Warehouse 2"
    />
    <WarehouseTableComponent
      v-if="warehouse3.length"
      :items="warehouse3"
      warehouse="Warehouse 3"
    />
    <WarehouseTableComponent
      v-if="warehouse4.length"
      :items="warehouse4"
      warehouse="Warehouse 4"
    />
    <WarehouseTableComponent
      v-if="others.length"
      :items="others"
      warehouse="Others"
    />
  </div>
  <div v-else>No Sales Order Found</div>
</template>
<style scoped></style>
