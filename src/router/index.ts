import { createRouter, createWebHashHistory } from "vue-router";
import { storage } from "@/utils/storage";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TasksView from "@/views/TasksView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
    { path: "/tasks", component: TasksView },
  ],
});

router.beforeEach((to) => {
  const isAuthed = Boolean(storage.getToken());
  const publicPages = ["/login", "/register"];

  if (!isAuthed && !publicPages.includes(to.path)) {
    return "/login";
  }
  if (isAuthed && publicPages.includes(to.path)) {
    return "/tasks";
  }
});

export default router;
