<template>
  <div :class="(store.getActiveMenu?.toLowerCase() == data.name.toLowerCase() || store.getHeaderValue?.toLowerCase() == data.name.toLowerCase()) ? 'sidebar-menu active-nav' : 'sidebar-menu'">
    <span class="sidebar-icon"><Icon :icon="data?.icon" /></span>
    <span class="sidebar-title">{{ data?.name }}</span>
  </div>
  <div class="sidebar-menu-item-box">
    <div class="sidebar-menu-item" v-for="(item, index) in data.childs" :key="index">
      <Item :data="item" :menuName="data.name"/>
    </div>
  </div>
</template>

<script setup>
import Item from "./item.vue";
import { Icon } from "@iconify/vue";
const props = defineProps({ data: Object });
const data = ref(props.data);
import { useCommonStore } from "../../../store/commonStore"
const store = useCommonStore()
</script>
