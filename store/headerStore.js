import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', () => {
    const headerValue = ref('')
    const activeMenu = ref('')
    const getHeaderValue = computed(() => headerValue.value)
    function setHeaderStore(val) {
        headerValue.value = val;
    }

    const getActiveMenu = computed(() => activeMenu.value)
    function setActiveMenu(val) {
        activeMenu.value = val;
    }

    return { setHeaderStore, headerValue, getHeaderValue, activeMenu, getActiveMenu, setActiveMenu }
  })