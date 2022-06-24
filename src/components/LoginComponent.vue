<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const username = ref();
const password = ref();

const handleLogin = () => {
  axios
    .post("https://pease-booking-server.herokuapp.com" + "/auth/login", {
      username: username.value,
      password: password.value,
    })
    .then((res: any) => {
      store.dispatch("LOG_IN", { accessToken: res.data.access_token });
      router.push({ name: "sales-orders" });
    })
    .catch(() => {
      alert("Incorrect Username or Password");
    });
};
</script>
<template>
  <div class="container justify-content-center">
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="username">Username</label
          ><input
            type="text"
            name="username"
            v-model="username"
            class="form-control form-control-user"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="password">Password</label
          ><input
            type="password"
            name="password"
            v-model="password"
            class="form-control form-control-password"
          />
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" @click="handleLogin">
      Log In
    </button>
  </div>
</template>
<style scoped></style>
