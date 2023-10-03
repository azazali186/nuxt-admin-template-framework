<template>
  <NuxtLink :to="data.path" @click="setAttributes"
    ><div
      :class="
        store.getActiveMenu?.toLowerCase() == data.name.toLowerCase() ||
        store.getHeaderValue?.toLowerCase() == data.name.toLowerCase()
          ? 'sidebar-item active-nav'
          : 'sidebar-item'
      "
    >
      <span class="sidebar-icon"><Icon :icon="data?.icon" /></span>
      <span class="sidebar-title">{{ data?.name }}</span>
    </div>
  </NuxtLink>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({ data: Object, menuName: String });
const data = ref(props.data);
const menuName = ref(props.menuName);
import { useCommonStore } from "../../../store/commonStore";
const store = useCommonStore();

console.log("store.getActiveMenu  item  ", store.getActiveMenu);
console.log("store.getHeaderValue  item  ", store.getHeaderValue);
console.log("data?.value?.name  item  ", data?.value?.name);

const setAttributes = () => {
  store.setHeaderStore(data.value.name);
  if (menuName.value) store.setActiveMenu(menuName.value);
  else store.setActiveMenu(null);
};
</script>
