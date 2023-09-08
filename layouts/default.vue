<template>
  <div class="layout">
    <div class="nav-head">
      <AppSidebar />
    </div>
    <div class="w-100 p-1">
      <AppHeader />

      <div class="page-content">
        <slot />
      </div>
      
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import AppHeader from "./app/header";
import AppFooter from "./app/footer";
import AppSidebar from "./app/sidebar";
import { useCommonStore } from "../store/commonStore";
const store = useCommonStore();
store.init()
</script>
