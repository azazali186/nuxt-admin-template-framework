import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", () => {
  const headerValue = ref("");
  const activeMenu = ref("");
  const getHeaderValue = computed(() => headerValue.value);
  function setHeaderStore(val) {
    headerValue.value = val;
    localStorage.setItem("page-title", val);
  }

  function init() {
    if (typeof window !== "undefined") {
      if (!headerValue.value) {
        if (localStorage.getItem("page-title")) {
          setHeaderStore(localStorage.getItem("page-title"));
        }
      }
      if (!activeMenu.value) {
        if (localStorage.getItem("activeMenu")) {
          setActiveMenu(localStorage.getItem("activeMenu"));
        }
      }
    }
  }

  const getActiveMenu = computed(() => activeMenu.value);
  function setActiveMenu(val) {
    localStorage.setItem("activeMenu", val);
    activeMenu.value = val;
  }

  return {
    setHeaderStore,
    headerValue,
    getHeaderValue,
    activeMenu,
    getActiveMenu,
    setActiveMenu,
    init,
  };
});
