import { api } from "./api";

export type Task = {
  id: number;
  userId: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * 取得某個使用者的 tasks
 */
export async function fetchTasks(userId: number): Promise<Task[]> {
  const { data } = await api.get<Task[]>(
    `/tasks?userId=${userId}&_sort=createdAt&_order=desc`
  );
  return data;
}

/**
 * 新增 task
 */
export async function createTask(payload: {
  userId: number;
  title: string;
}): Promise<Task> {
  const now = new Date().toISOString();

  const { data } = await api.post<Task>("/tasks", {
    userId: payload.userId,
    title: payload.title,
    done: false,
    createdAt: now,
    updatedAt: now,
  });

  return data;
}

/**
 * 切換完成狀態
 */
export async function toggleTaskDone(task: Task): Promise<Task> {
  const now = new Date().toISOString();

  const { data } = await api.patch<Task>(`/tasks/${task.id}`, {
    done: !task.done,
    updatedAt: now,
  });

  return data;
}

/**
 * 刪除 task
 */
export async function deleteTask(taskId: number): Promise<void> {
  await api.delete(`/tasks/${taskId}`);
}
