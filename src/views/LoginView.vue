<template>
  <div style="max-width: 360px; margin: 40px auto;">
    <h1>登入</h1>

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
          autocomplete="current-password"
          style="width: 100%; padding: 8px;"
          placeholder="••••••••"
        />
      </label>

      <button
        type="button"
        @click="onLogin"
        :disabled="isLoading"
        style="padding: 10px;"
      >
        {{ isLoading ? "Logging in..." : "登入" }}
      </button>
      <p style="margin-top: 12px; text-align: center;">
        還沒有帳號？
        <router-link to="/register">前往註冊</router-link>
      </p>

      <p v-if="errorMsg" style="color: #b00020; margin: 0;">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
 
import { ref } from "vue";
import { useRouter,useRoute } from "vue-router";
import { storage } from "@/utils/storage";

 const router = useRouter();
 const route = useRoute();

 const email = ref("");
 const password = ref("");
 const isLoading = ref(false);
 const errorMsg = ref("");

 email.value = String(route.query.email || "");
 if (route.query.email) {
  router.replace({ path: "/login" }); // 可選：清掉 ?email=
}


async function apilogin(payload: { email: string; password: string }) {
  const inputemail = payload.email.trim();
  const inputpassword = payload.password;

  const users = storage.getUsers(); // 讀 todoma_users

  const matched = users.find(
    (u) => u.email === inputemail && u.password === inputpassword
  );

  if (!matched) {
    throw new Error("Invalid credentials");
  }

  return { token: "demo-token" };
}




async function onLogin() {
  errorMsg.value = "";

  // 最基本前端驗證
  if (!email.value || !password.value) {
    errorMsg.value = "請輸入 Email 與密碼";
    return;
  }

  try {
    isLoading.value = true;

    const res = await apilogin({ email: email.value, password: password.value });
    const token = res?.token;

    if (!token) {
      throw new Error("Token missing");
    }

    storage.setToken(token);
    router.push("/tasks");
  } catch (e) {
    console.error(e);
    errorMsg.value = "登入失敗，請確認帳號密碼";
  } finally {
    isLoading.value = false;
  }
}
</script>
