import { createRouter, createWebHashHistory } from "vue-router";
import { storage } from "@/utils/storage";

import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TasksView from "@/views/TasksView.vue";

const router = createRouter({
  history: createWebHashHistory(), // ✅ 關鍵：改成 Hash
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
    { path: "/tasks", component: TasksView },
  ],
});

router.beforeEach((to) => {
  const isAuthed = Boolean(storage.getToken());
  const publicPages = ["/login", "/register"]; // ✅ 全部小寫

  if (!isAuthed && !publicPages.includes(to.path)) {
    return "/login";
  }

  if (isAuthed && publicPages.includes(to.path)) {
    return "/tasks";
  }
});

export default router;
