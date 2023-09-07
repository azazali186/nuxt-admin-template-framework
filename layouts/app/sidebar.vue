<template>
   <div class="sidebar">
        <div v-for="(item, index) in menu" :key="index">
            <Item :data="item" v-if="item.childs.length == 0"/>
            
            <Menu :data="item" v-else />
            <hr class="divider" />
        </div>
   </div>
</template>

<script setup>
import Item from './sidebar/item.vue'
import Menu from './sidebar/menu.vue'
import SideBar from './sidebar/sidebar.json'

const menu = ref(SideBar);
</script>
