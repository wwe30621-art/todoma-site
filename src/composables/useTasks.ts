import { computed, ref } from "vue";
import { storage, type StoredTask } from "@/utils/storage";

function makeId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function useTasks() {
  const tasks = ref<StoredTask[]>(storage.getTasks());

  function sync(next: StoredTask[]) {
    tasks.value = next;
    storage.setTasks(next);
  }

  const sortedTasks = computed(() => {
    return [...tasks.value].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return b.createdAt - a.createdAt;
    });
  });

  function addTask(title: string) {
    const t = title.trim();
    if (!t) return;

    sync([
      { id: makeId(), title: t, done: false, createdAt: Date.now() },
      ...tasks.value,
    ]);
  }

  function toggleTask(id: string) {
    sync(
      tasks.value.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  function removeTask(id: string) {
    sync(tasks.value.filter((t) => t.id !== id));
  }

  function clearAllTasks() {
    sync([]);
  }
  function clearCompletedTasks() {
  tasks.value = tasks.value.filter((t) => !t.done);
  sync(tasks.value);
}



  return {
    tasks,
    sortedTasks,
    addTask,
    toggleTask,
    removeTask,
    clearAllTasks,
    clearCompletedTasks,
  };
}
