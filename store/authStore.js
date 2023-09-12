import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const auth = ref();
  const token = ref();

  const setAuth = (data) => {
    if (data) {
      auth.value = data;
      token.value = data.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("my-custom-token", data.token);
      }
    }
  };

  const setToken = (data) => {
    token.value = data;
    if (typeof window !== "undefined") {
      localStorage.setItem("my-custom-token", data);
    }
  };

  const getToken = computed(() => {
    if (typeof window !== "undefined" && localStorage.getItem("my-custom-token")) {
      token.value = localStorage.getItem("my-custom-token"); 
    }
    return token.value
  });

  const clearAuth = () => {
    auth.value = null;
    token.value = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("my-custom-token");
    }
  };

  return {
    setAuth,
    setToken,
    clearAuth,
    getToken,
    token
  };
});
