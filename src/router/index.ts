import { createRouter, createWebHistory } from "vue-router";
import { storage } from "@/utils/storage";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TasksView from "@/views/TasksView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
    { path: "/tasks", component: TasksView },
  ],
});

router.beforeEach((to) => {
  const isAuthed = Boolean(storage.getToken());
  const publicPages = ["/login", "/register",];

  if (!isAuthed && !publicPages.includes(to.path)) {
    return "/login";
  }

  // 已登入還去 login/register → 導回 tasks
  if (isAuthed && publicPages.includes(to.path)) {
    return "/tasks";
  }
});


export default router;
