import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const authStore = useAuthStore()
  if (!authStore.getToken) {
    return navigateTo("/login");
  }
});
