<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import axios from "axios";

interface ItemInterface {
  _id: string;
  id: number;
  baseUnitId: number;
  code: string;
  description: string;
  groupId: number;
  inactive: boolean;
  units: [];
}

const store = useStore();
const props = defineProps(["salesOrder"]);

const items = ref();
const selectedItem = ref<ItemInterface>();
const itemDescription = ref();
const ums = ref();
const selectedUm = ref();
const quantity = ref();
const customers = ref();
const selectedCustomer = ref();
const address = ref();
const salesRep = ref();
const salesOrderNumber = ref();
const date = ref();
const note = ref();
const username = ref();
const addedItems = ref<{ item: ItemInterface; quantity: number; um: string }[]>(
  []
);

store.dispatch("GET_CUSTOMERS").then(() => {
  customers.value = store.state.customers;
});

store.dispatch("GET_ITEMS").then(() => {
  items.value = store.state.items;
});

const handleItemChange = () => {
  selectedItem.value = items.value.filter(
    (i: any) => i.description === itemDescription.value
  )[0];
  if (selectedItem.value) {
    ums.value = selectedItem.value.units;
  } else {
    ums.value = [];
    selectedUm.value = "";
  }
};

const handleAddItem = () => {
  if (selectedItem.value !== undefined) {
    addedItems.value.push({
      item: selectedItem.value,
      um: selectedUm.value,
      quantity: quantity.value,
    });
    itemDescription.value = "";
    ums.value = [];
    selectedUm.value = "";
    quantity.value = 0;
  }
};

const handleDeleteItem = (index: number) => {
  addedItems.value.splice(index, 1);
};

const handleSubmit = async () => {
  await axios
    .patch("https://pease-booking-server.herokuapp.com" + "/sales-orders/" + props.salesOrder._id, {
      _id: props.salesOrder._id,
      salesOrderId: salesOrderNumber.value,
      salesOrderItems: addedItems.value,
      date: moment(date.value),
      customer: selectedCustomer.value,
      salesRep: salesRep.value,
      address: address.value,
      note: note.value,
      username: username.value,
    })
    .then(() => {
      alert("Sales Order Updated");
    })
    .catch((err) => {
      console.error(err);
    });
};

watch(props, () => {
  selectedCustomer.value = props.salesOrder.customer;
  address.value = props.salesOrder.address;
  salesRep.value = props.salesOrder.salesRep;
  salesOrderNumber.value = props.salesOrder.salesOrderId;
  date.value = moment(props.salesOrder.date).format("YYYY-MM-DD");
  note.value = props.salesOrder.note;
  username.value = props.salesOrder.username;
  addedItems.value = props.salesOrder.salesOrderItems;
});
</script>
<template>
  <!-- Sales Order Details -->
  <div class="row">
    <div class="col">
      <div class="input-group">
        <label for="customer" class="input-group-text">Customer</label>
        <input
          type="text"
          list="customers"
          name="customer"
          class="form-control"
          v-model="selectedCustomer"
        />
        <datalist id="customers">
          <option
            v-for="(customer, index) in customers"
            :key="index"
            :value="customer.name"
          >
            {{ customer.name }}
          </option>
        </datalist>
      </div>
    </div>
    <div class="col">
      <div class="input-group">
        <label for="date" class="input-group-text">Date</label>
        <input type="date" name="date" class="form-control" v-model="date" />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="input-group">
        <label for="address" class="input-group-text">Address</label>
        <input
          type="text"
          name="address"
          class="form-control"
          v-model="address"
        />
      </div>
    </div>
    <div class="col">
      <div class="input-group">
        <label for="sales-order-number" class="input-group-text"
          >Sales Order Number</label
        >
        <input
          type="text"
          name="sales-order-number"
          class="form-control"
          v-model="salesOrderNumber"
        />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="input-group">
        <label for="sales-rep" class="input-group-text">Sales Rep</label>
        <input
          type="text"
          name="sales-rep"
          class="form-control"
          v-model="salesRep"
        />
      </div>
    </div>
    <div class="col">
      <div class="input-group">
        <label for="note" class="input-group-text">Note</label>
        <input type="text" name="note" class="form-control" v-model="note" />
      </div>
    </div>
  </div>
  <!-- Sales Order Details -->
  <h2>Add Item</h2>
  <!-- Item -->
  <div class="row">
    <div class="col">
      <div class="input-group">
        <label for="item" class="input-group-text">Description</label>
        <input
          type="text"
          name="item"
          list="items"
          class="form-control"
          v-model="itemDescription"
          @input="handleItemChange"
        />
        <datalist id="items">
          <template v-for="(item, index) in items" :key="index">
            <option v-if="!item.inactive" :value="item.description">
              {{ item.description }}
            </option>
          </template>
        </datalist>
      </div>
    </div>
    <div class="col">
      <div class="input-group">
        <label for="um" class="input-group-text">U/M</label>
        <input
          type="text"
          name="um"
          list="ums"
          class="form-control"
          v-model="selectedUm"
        />
        <datalist id="ums">
          <template v-if="ums">
            <option v-for="(um, index) in ums" :key="index" :value="um">
              {{ um }}
            </option>
          </template>
        </datalist>
      </div>
    </div>
    <div class="col">
      <div class="input-group">
        <label for="quantity" class="input-group-text">Quantity</label>
        <input
          type="number"
          name="quantity"
          min="1"
          class="form-control"
          v-model="quantity"
        />
      </div>
    </div>
    <div class="col">
      <button type="button" class="btn btn-success" @click="handleAddItem">
        Add Item
      </button>
    </div>
  </div>
  <button type="submit" class="btn btn-primary w-100" @click="handleSubmit">
    Save
  </button>
  <!-- Item -->
  <!-- Items Table -->
  <table
    v-if="addedItems.length"
    class="table table-responsive table-striped table-hover"
  >
    <thead>
      <th>Code</th>
      <th>Item Description</th>
      <th>Unit Measure</th>
      <th>Quantity</th>
    </thead>
    <tbody>
      <tr v-for="(item, index) in addedItems" :key="index">
        <td>{{ item.item.code }}</td>
        <td>{{ item.item.description }}</td>

        <td>{{ item.um }}</td>
        <td>
          <input type="number" style="width: 10ch" v-model="item.quantity" />
        </td>
        <td style="color: red" @click="handleDeleteItem(index)">Delete</td>
      </tr>
    </tbody>
  </table>
  <!-- Items Table -->
</template>
<style scoped></style>
