<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";

const props = defineProps(["handleChange"]);
const from = ref(moment().subtract(1, "M").format("YYYY-MM-DD"));
const to = ref(moment().format("YYYY-MM-DD"));
</script>
<template>
  <div class="row">
    <div class="col">
      <div class="input-group">
        <label class="input-group-text">From:</label>
        <input
          type="date"
          class="form-control"
          v-model="from"
          @input="props.handleChange('FROM', from)"
        />
      </div>
    </div>
    <div class="col">
      <div class="input-group">
        <label class="input-group-text">To:</label>
        <input
          type="date"
          class="form-control"
          v-model="to"
          @input="props.handleChange('TO', to)"
        />
      </div>
    </div>
  </div>
</template>
