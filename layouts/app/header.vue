<template>
  <div class="header">
    <div class="title">
      {{ store.headerValue || "" }}
    </div>
    <div class="header-icons">
      <span id="languages">
        <Icon icon="fa:language" />
      </span>
      <span id="mode">
        <Icon icon="bi:moon-fill" />
      </span>
      <span id="notifications">
        <Icon icon="fa:bell" />
      </span>
      <span id="profile">
        <Icon icon="fa:user" />
      </span>
      <div class="languages-model">
        <p>Hello Ali</p>
      </div>
      <div class="mode-model">
        <p>Hello Ali</p>
      </div>
      <div class="notifications-model">
        <p>Hello Ali</p>
      </div>
      <div class="profile-model">
        <p>Hello Ali</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useCommonStore } from "../../../store/commonStore";
const store = useCommonStore();
</script>
