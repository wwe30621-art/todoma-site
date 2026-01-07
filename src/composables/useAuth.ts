import { computed, ref } from "vue";
import { storage, type StoredUser } from "@/utils/storage";

const tokenRef = ref<string | null>(storage.getToken());
const userRef = ref<StoredUser | null>(storage.getUser());

export function useAuth() {
  const isAuthed = computed(() => Boolean(tokenRef.value));

  function loginMock(email: string) {
    // 先用 mock：隨便產一個 token + 一個 user
    const fakeToken = `mock_${Date.now()}`;
    const fakeUser: StoredUser = { id: 1, email, name: "Demo" };

    storage.setToken(fakeToken);
    storage.setUser(fakeUser);

    tokenRef.value = fakeToken;
    userRef.value = fakeUser;
  }

  function logout() {
    storage.clearAll();
    tokenRef.value = null;
    userRef.value = null;
  }

  return {
    token: tokenRef,
    user: userRef,
    isAuthed,
    loginMock,
    logout,
  };
}
