const TOKEN_KEY = "todoma_token";
const USER_KEY = "todoma_user";
const TASKS_KEY = "todoma_tasks";
const USERS_KEY = "todoma_users";

export type AuthUser = {
  email: string;
  password: string;
};

export type StoredTask = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type StoredUser = {
  id: number;
  email: string;
  name?: string;
};

export const storage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getAuthUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  },
  setAuthUser(user: AuthUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearAuthUser() {
    localStorage.removeItem(USER_KEY);
  },

  clearAll() {
    this.clearToken();
    this.clearAuthUser();
    this.clearUsers();
    this.clearTasks();
  },
  getTasks(): StoredTask[] {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? (JSON.parse(raw) as StoredTask[]) : [];
   },

   setTasks(tasks: StoredTask[]) {
     localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
   },

   clearTasks() {
     localStorage.removeItem(TASKS_KEY);
   },
    
   getUsers(): AuthUser[] {
    const raw = localStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as AuthUser[]) : [];
   },

   setUsers(users: AuthUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
   },

   addUser(user: AuthUser) {
     const users = this.getUsers();
      this.setUsers([...users, user]);
   },

    clearUsers() {
       localStorage.removeItem(USERS_KEY);
},


  }

