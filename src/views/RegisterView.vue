<template>
  <div style="max-width: 360px; margin: 40px auto;">
    <h1>註冊</h1>

    <div style="display: grid; gap: 12px; margin-top: 16px;">
      <label>
        Email
        <input
          v-model.trim="email"
          type="email"
          autocomplete="username"
          style="width: 100%; padding: 8px;"
          placeholder="you@example.com"
        />
      </label>

      <label>
        Password
        <input
          v-model="password"
          type="password"
          autocomplete="new-password"
          style="width: 100%; padding: 8px;"
          placeholder="至少 4 碼"
        />
      </label>

      <button type="button" @click="onRegister" style="padding: 10px;">
        註冊
      </button>

      <p v-if="errorMsg" style="color: #b00020; margin: 0;">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storage, type AuthUser } from "@/utils/storage";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMsg = ref("");

function onRegister() {
  errorMsg.value = "";

  if (!email.value || !password.value) {
    errorMsg.value = "請輸入 Email 與密碼";
    return;
  }
  if (password.value.length < 4) {
    errorMsg.value = "密碼至少 4 碼";
    return;
  }

  const users = storage.getUsers();
  const exists = users.some((u) => u.email === email.value);
  if (exists) {
    errorMsg.value = "此帳號已存在";
    return;
  }

  const newUser: AuthUser = { email: email.value, password: password.value };
  storage.addUser(newUser);

  
  router.push({
  path: "/login",
  query: { email: email.value },
});
}
</script>
