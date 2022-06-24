<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["handleChange"]);
const term = ref("");
</script>
<template>
  <div class="input-group">
    <label for="search" class="input-group-text">Search</label>
    <input
      type="text"
      class="form-control"
      v-model="term"
      @input="props.handleChange(term)"
    />
  </div>
</template>
