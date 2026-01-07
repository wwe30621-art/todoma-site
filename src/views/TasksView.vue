<template>
  <div class="page">
    <div class="card">
      <h1 class="title">代辦事項</h1>

      <!-- 新增任務列 -->
      <div class="add-row">
        <input
          v-model.trim="newTitle"
          type="text"
          class="input"
          placeholder="新增代辦事項"
          @keydown.enter="onAdd"
        />
        <button type="button" class="btn" @click="onAdd">
          新增
        </button>
      </div>

      <p v-if="hint" class="hint">{{ hint }}</p>
        <h2 class="section-title">任務清單</h2>
      <ul class="list">
  <li v-for="t in sortedTasks" :key="t.id" class="item">
    <input
      type="checkbox"
      :checked="t.done"
      @change="toggleTask(t.id)"
    />

    <span
      class="item-title"
      :class="{ done: t.done }"
    >
      {{ t.title }}
    </span>

    
  </li>
</ul>
      
      <div class="action-row">
        <button type="button" class="btn" @click="logout">登出</button>

        <button type="button" class="btn danger" @click="clearCompletedTasks">
          清除已完成
        </button>

        <button type="button" class="btn danger" @click="onClearAll">
          清除所有事項
        </button>
      </div>
    </div>
  </div>

  

</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storage } from "@/utils/storage";
import { useTasks } from "@/composables/useTasks";

const router = useRouter();

// 登出：清狀態後回 login
function logout() {
  if (typeof storage.clearAll === "function") {
    storage.clearAll();
  } else {
    storage.clearToken();
    if (typeof storage.clearAuthUser === "function") storage.clearAuthUser();
  }
  router.push("/login");
}

function onClearAll() {
  const ok = window.confirm("確定要刪除全部任務嗎？此操作無法復原。");
  if (!ok) return;
  clearAllTasks();
}


// tasks 邏輯
const { sortedTasks, addTask, toggleTask, removeTask, clearAllTasks, clearCompletedTasks, } = useTasks();

const newTitle = ref("");
const hint = ref("");

function onAdd() {
  hint.value = "";
  if (!newTitle.value.trim()) {
    hint.value = "請輸入任務內容";
    return;
  }
  addTask(newTitle.value);
  newTitle.value = "";
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 16px;
}

.card {
  width: 420px;     /* 更接近你想要的第二張 */
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 40px;
  margin: 0 0 18px;
  color: rgba(255, 255, 255, 0.82);
}

.add-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
}

.input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  outline: none;
}

.hint {
  margin: 10px 0 0;
  color: #b00020;
}

/* 清單 */
.section-title {
  margin: 18px 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
}

.list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.item-title {
  flex: 1;
}

.item-title.done {
  text-decoration: line-through;
  opacity: 0.6;
}

/* 按鈕列 */
.action-row {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
}

/* 通用按鈕 */
.btn {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #e7e7e7;
  cursor: pointer;
}

.btn:hover {
  background: #dcdcdc;
}

/* 小按鈕（清單刪除） */
.btn.small {
  padding: 6px 10px;
  border-radius: 8px;
}

/* 危險操作 */
.btn.danger {
  background: #ffe3e3;
  color: #900;
}

.btn.danger:hover {
  background: #ffd2d2;
}
</style>
