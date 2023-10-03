import { defineStore } from "pinia";

export const useCommonStore = defineStore(
  "common",
  () => {
    const headerValue = reactive({
      value: "",
    });
    const activeMenu = reactive({
      value: "",
    });
    const getHeaderValue = computed(() => headerValue.value);
    function setHeaderStore(val) {
      headerValue.value = val;
    }

    function init() {
      
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
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
