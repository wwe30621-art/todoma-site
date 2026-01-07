# Todoma 任務管理系統

Todoma 是一個使用 **Vue 3** 與 **TypeScript** 製作的任務管理（Todo）前端專案，  
主要用來練習登入流程、狀態管理與專案結構設計。

本專案為純前端實作，未串接實際後端 API，  
透過 `localStorage` 模擬使用者資料與任務資料。

---

## 功能說明

- 使用者註冊與登入（使用 localStorage 模擬）
- 登入後才能進入任務頁面（Router Guard）
- 新增任務
- 標記任務完成 / 未完成
- 刪除單筆任務
- 清除已完成任務
- 登出並清除登入狀態
- 重新整理頁面後，任務資料仍會保留

---

## 使用技術

- Vue 3
- TypeScript
- Vite
- Vue Router
- Composition API

---

## 專案結構



---

## 設計說明

- 將任務相關的邏輯集中於 `useTasks.ts`，讓畫面元件只負責 UI 與事件觸發。
- 將 localStorage 存取封裝在 `storage.ts`，避免在各個元件中直接操作。
- 透過 Vue Router 的導航守衛（Router Guard），限制未登入使用者存取任務頁面。
- 使用 TypeScript 定義資料型別，提高程式可讀性與降低錯誤風險。

---

## 專案取捨說明

- 本專案未實作實際後端與 API 串接。
- 密碼未進行加密，僅作為前端流程示範。
- 未加入角色權限（如管理員 / 使用者）。
- 未實作單元測試。

本專案重點在於前端流程、狀態管理與專案結構的理解與實作。

---

## 本機執行方式

```bash
npm install
npm run dev
