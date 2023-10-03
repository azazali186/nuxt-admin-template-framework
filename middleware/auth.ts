import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const authStore = useAuthStore()
  console.log("to  is authenticated with authStore = ", (to.meta))
  if ( authStore.isAuthenticated(to.path) === false) {
    return navigateTo("/login");
  }
});
