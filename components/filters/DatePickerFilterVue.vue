<template>
  <VueDatePicker
    class="bg-transparent-all"
    placeholder="Choose the date"
    range :show-last-in-range="true"
    v-model="date"
    mode-height="90"
    :offset="20"
    time-picker-inline
    :enable-time-picker="false"
  />
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({ model: String});
const date = ref(props.model);

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 2));
  date.value = [startDate, endDate];
});

</script>
