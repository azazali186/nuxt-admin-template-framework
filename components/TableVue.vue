<template>
  <div class="table-view bg-transparent-all">
    <div class="table-title text-center text-3xl font-extrabold my-5">
      {{ title || "Welcome to UI Framework World" }}
    </div>

    <div class="w-fit mb-3">
      <USelectMenu
        v-slot="{ open }"
        v-model="selectedColumns"
        :options="columns"
        multiple
        placeholder="Columns"
        icon="material-symbols:check"
        variant="outline"
        value-attribute="name"
        option-attribute="name"
        :ui-menu="{ option: { base: 'cursor-pointer uppercase bg-transparent-all' } }"
      >
        <UButton color="transparent" variant="outline" class="px-4 ml-10">
          {{
            selectedColumns
              .map((v) => {
                return v.toUpperCase();
              })
              .join(" ,")
          }}
          <Icon
            icon="material-symbols:arrow-right"
            class="w-5 h-5 transition-transform"
            :class="[open && 'transform rotate-90']"
          />
        </UButton>
      </USelectMenu>
    </div>
    <div class="w-100 px-10 flex mb-3 bg-transparent-all justify-between">
      <div class="flex bg-transparent-all">
        <span> Rows Per Page </span>
        <USelectMenu
          v-model="pageCount"
          :options="pageCountData"
          placeholder="Per Page"
          variant="outline"
          value-attribute="value"
          option-attribute="value"
          icon="material-symbols:check"
          :ui-menu="{ option: { base: 'cursor-pointer bg-transparent-all'} }"
          :ui="{ option: { base: 'cursor-pointer bg-transparent-all'} }"
        >
          <UButton color="transparent" variant="outline" class="px-4 ml-5 bg-transparent-all">
            {{ pageCount }}
          </UButton>
        </USelectMenu>
      </div>
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="filteredData.length"
        :active-button="{ variant: 'outline' }"
        :inactive-button="{ color: 'transparent', variant: 'outline' }"
        class="bg-transparent-all"
        :prev-button="{
          label: 'Prev',
          variant: 'outline',
        }"
        :next-button="{
          trailing: true,
          label: 'Next',
          variant: 'outline',
        }"
      >
        <template #prev="{ onClick }">
          <UButton
            color="transparent"
            variant="outline"
            class="rtl:[&_span:first-child]:rotate-180 me-2 bg-transparent-all"
            @click="onClick"
          >
            <Icon
              icon="material-symbols:arrow-left"
              class="w-5 h-5 transition-transform bg-transparent-all"
            />
            Prev
          </UButton>
        </template>
        <template #next="{ onClick }">
          <UButton
            color="transparent"
            variant="outline"
            class="rtl:[&_span:last-child]:rotate-180 ml-2-i bg-transparent-all"
            @click="onClick"
          >
            Next
            <Icon
              icon="material-symbols:arrow-right"
              class="w-5 h-5 transition-transform bg-transparent-all"
            />
          </UButton>
        </template>
      </UPagination>
    </div>

    <div class="ml-10 mb-3 bg-transparent-all">
      <UInput
        v-model="queryFilter"
        class="w-1/4 bg-transparent-all p-2 bg-transparent-all"
        placeholder="Filter ..."
        :onchange="filteredRows"
      />
    </div>

    <div
      class="px-10 py-3 flex justify-center items-center bg-transparent-all w-full gap-5 relative overflow-x-auto"
    >
      <table class="table w-full text-sm text-left bg-transparent-all" v-if="data?.length > 0">
        <thead class="text-xs uppercase sticky top-0">
          <tr>
            <th
              scope="col"
              :class="' text-center font-extrabold text-base ' + classString"
            >
              #
            </th>
            <th
              scope="col"
              :class="' text-center font-extrabold text-base ' + classString"
              v-for="(col, index) in selectedColumns"
              :key="index"
            >
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in selectedData" :key="index">
            <td :class="' text-center ' + classString">
              {{ index + 1 }}
            </td>
            <td
              :class="
                col?.align
                  ? ' text-' + col.align + ' ' + classString
                  : classString
              "
              v-for="(col, index) in selectedColumns"
              :key="index"
            >
            <div v-if="isHTML(item[col.toLowerCase()])" v-html="item[col.toLowerCase()]"></div>
            <div v-else>{{ item[col.toLowerCase()] }}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No Data Available</div>
    </div>
    <div class="w-100 px-10 flex mb-3 bg-transparent-all justify-between">
      <div class="flex">
        <span> Rows Per Page </span>
        <USelectMenu
          v-model="pageCount"
          :options="pageCountData"
          placeholder="Per Page"
          variant="outline"
          value-attribute="value"
          option-attribute="value"
          :ui-menu="{ option: { base: 'cursor-pointer bg-transparent-all' } }"
        >
          <UButton color="transparent" variant="outline" class="px-4 ml-5 bg-transparent-all">
            {{ pageCount }}
          </UButton>
        </USelectMenu>
      </div>
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="filteredData.length"
        :active-button="{ variant: 'outline' }"
        :inactive-button="{ color: 'transparent', variant: 'outline' }"
        :prev-button="{
          label: 'Prev',
          variant: 'outline',
        }"
        :next-button="{
          trailing: true,
          label: 'Next',
          variant: 'outline',
        }"
        class="bg-transparent-all"
      >
        <template #prev="{ onClick }">
          <UButton
            color="transparent"
            variant="outline"
            class="rtl:[&_span:first-child]:rotate-180 me-2 bg-transparent-all"
            @click="onClick"
          >
            <Icon
              icon="material-symbols:arrow-left"
              class="w-5 h-5 transition-transform bg-transparent-all"
            />
            Prev
          </UButton>
        </template>
        <template #next="{ onClick }">
          <UButton
            color="transparent"
            variant="outline"
            class="rtl:[&_span:last-child]:rotate-180 ml-2-i bg-transparent-all"
            @click="onClick"
          >
            Next
            <Icon
              icon="material-symbols:arrow-right"
              class="w-5 h-5 transition-transform bg-transparent-all"
            />
          </UButton>
        </template>
      </UPagination>
    </div>
  </div>
</template>

<script setup>
import { _1 } from "#tailwind-config/theme/aspectRatio";
import { Icon } from "@iconify/vue";
const props = defineProps({ data: Array, title: String, columns: Array });
const data = ref(props.data);
const filteredData = ref(props.data);
const title = ref(props.title);
const columns = ref(props.columns);
import Card from "./CardVue.vue"
const page = ref(1);
const pageCount = ref(5);
const pageCountData = ref([
  {
    value: 5,
  },
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 50,
  },
  {
    value: 100,
  },
]);
const selectedColumns = ref([]);
const selectedData = ref([]);
const classString = ref(
  "px-6 py-2 bg-transparent-all border-2 border-solid border-white"
);

const queryFilter = ref("");


onMounted(() => {
  if (!columns.value)
    if (data?.value?.length > 0) {
      columns.value = getColumnNameObject(Object.keys(data.value[0]));
    }

  selectedColumns.value = getColumnArray(columns.value);
  selectedData.value = data?.value?.slice(0, pageCount.value);

  console.log("selectedData: onMounted ", pageCount.value);
});

watch(queryFilter, (newData) => {
  console.log("selectedData: ", selectedData.value);
  console.log("queryFilter is " + queryFilter + " now " + newData);
});

watch(page, (newData) => {
  let from = 0;
  let to = pageCount.value;

  if (page.value > 1) {
    to = page.value * pageCount.value;
    from = to - pageCount.value;
  }
  selectedData.value = filteredData.value.slice(from, to);
});

watch(pageCount, (newData) => {
  selectedData.value = filteredData.value.slice(0, newData);
});

const filteredRows = computed(() => {
  console.log("fileter called");
  if (!queryFilter.value) {
    selectedData.value = data?.value;
    filteredData.value = data?.value;
    return data;
  }
  const res = data.value.filter((user) => {
    return Object.values(user).some((value) => {
      return String(value)
        .toLowerCase()
        .includes(queryFilter.value.toLowerCase());
    });
  });
  filteredData.value = res;
  selectedData.value = res.slice(0, pageCount.value);
  console.log("res length ", res.length);
  return res;
});

const getColumnArray = (col) => {
  const res = [];
  col.map((c) => {
    res.push(c.name);
  });
  return res;
};

const getColumnNameObject = (columnsName) => {
  const data = [];
  columnsName.map((n) => {
    data.push({
      name: n,
    });
  });
  return data;
};

const isHTML = (str) => {
      const doc = new DOMParser().parseFromString(str, "text/html");
      return Array.from(doc.body.childNodes).some(node => node.nodeType === 1); // Node type 1 is an element node
    }
</script>
