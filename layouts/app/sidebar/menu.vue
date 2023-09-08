<template>
  <div :class="classVal">
    <span class="sidebar-icon"><Icon :icon="data?.icon" /></span>
    <span class="sidebar-title">{{ data?.name }}</span>
  </div>
  <div class="sidebar-menu-item-box">
    <div
      class="sidebar-menu-item"
      v-for="(item, index) in data.childs"
      :key="index"
    >
      <Item :data="item" :menuName="data.name" />
    </div>
  </div>
</template>

<script setup>
import Item from "./item.vue";
import { Icon } from "@iconify/vue";
const props = defineProps({ data: Object });
const data = ref(props.data);
import { useCommonStore } from "../../../store/commonStore";
const store = useCommonStore();
const classVal = ref("");

onMounted(() => {
  if (
    store.getActiveMenu?.toLowerCase() == data?.value?.name?.toLowerCase() ||
    store.getHeaderValue?.toLowerCase() == data?.value?.name?.toLowerCase()
  ) {
    classVal.value = "sidebar-menu active-nav";
  } else {
    classVal.value = "sidebar-menu";
  }
});
</script>
