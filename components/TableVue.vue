<template>
  <div class="table-view bg-transparent-all" v-if="isLoading == false">
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
        option-attribute="name"
        :ui-menu="{
          option: { base: 'cursor-pointer uppercase bg-transparent-all' },
        }"
      >
        <UButton color="transparent" variant="outline" class="px-4 ml-10">
          {{
            selectedColumns
              .map((v) => {
                return v.name.toUpperCase();
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
          :ui-menu="{ option: { base: 'cursor-pointer bg-transparent-all' } }"
          :ui="{ option: { base: 'cursor-pointer bg-transparent-all' } }"
        >
          <UButton
            color="transparent"
            variant="outline"
            class="px-4 ml-5 bg-transparent-all"
          >
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

    <div class="flex justify-between items-center w-100">
      <div class="ml-10 mb-3 flex gap-5 items-center bg-transparent-all">
        <UInput
          v-for="fsearch in filter.search"
          v-model="filterValues[fsearch.name]"
          class="bg-transparent-all p-2 bg-transparent-all w-100"
          :placeholder="fsearch.name.toUpperCase() + ' filter...'"
        />
        <VueDatePicker
          v-for="fdate in filter.date"
          :model="filterValues[fdate.name]"
        />
      </div>
      <div class="flex gap-5 justify-between items-center mr-10">
        <UButton
          color="transparent"
          variant="outline"
          class="ml-2-i bg-transparent-all"
          @click="isOpen = true"
        >
          Add
          <Icon
            icon="zondicons:add-outline"
            class="w-5 h-5 transition-transform bg-transparent-all"
          />
        </UButton>
      </div>
    </div>

    <div
      class="px-10 py-3 flex justify-center items-center bg-transparent-all w-full gap-5 relative overflow-x-auto"
    >
      <table
        class="table w-full text-sm text-left bg-transparent-all"
        v-if="data?.length > 0"
      >
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
              :class=" sortKey.toLowerCase() === col.name.toLowerCase() ? ' text-center font-extrabold text-base cursor-pointer ' + classString + ' active-sorting ' : ' text-center font-extrabold text-base cursor-pointer ' + classString "
              v-for="(col, index) in selectedColumns"
              :key="index"
              @click="col.sort ? sortTable(col.name) :''"
            >
            <div v-if="sortKey.toLowerCase() === col.name.toLowerCase()" class="flex gap-2 w-100 justify-center items-center">
              {{ col.name }} 
              <Icon v-if="col.sort" :icon="sortOrder === 'asc' ? 'mdi:arrow-up-bold' : 'mdi:arrow-down-bold'" />
            </div>
            <div v-else class="flex gap-2 w-100 justify-center items-center">
              {{ col.name }}
              <Icon v-if="col.sort" icon="pepicons-pop:sort" />
            </div>
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
              <div
                v-if="isHTML(item[col?.name?.toLowerCase()])"
                v-html="item[col?.name?.toLowerCase()]"
              ></div>
              <div v-else>{{ item[col?.name?.toLowerCase()] }}</div>
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
          <UButton
            color="transparent"
            variant="outline"
            class="px-4 ml-5 bg-transparent-all"
          >
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

  <div class="loading-screen" v-if="isLoading">
    <div class="loader"></div>
  </div>

  <UModal v-model="isOpen" :overlay="false">
    <UCard
      :ui="{
        base: 'h-full min-h-[400px] min-w-[200px] border-2 border-solid rounded border-white backdrop-blur-4px flex flex-col',
        background: ' bg-transparent-all ',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow',
        },
      }"
    >
      <template #header>
        <!-- Content -->
      </template>
      <!-- Content -->
      <template #footer>
        <!-- Content -->
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { _1 } from "#tailwind-config/theme/aspectRatio";
import { Icon } from "@iconify/vue";
import VueDatePicker from "./filters/DatePickerFilterVue.vue";
const props = defineProps({
  data: Array,
  title: String,
  columns: Array,
  filters: Object,
});
const data = ref(props.data);
const filter = ref(props.filters);
const filterValues = ref({});
const filteredData = ref(props.data);
const title = ref(props.title);
const columns = ref(props.columns);
const page = ref(1);
const pageCount = ref(5);
const isLoading = ref(true);
const isOpen = ref(false);
const sortKey = ref("");
const sortOrder = ref("asc");
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
  isLoading.value = true;
  if (!columns.value)
    if (data?.value?.length > 0) {
      columns.value = getColumnNameObject(Object.keys(data.value[0]));
    }

  selectedColumns.value = getColumnArray(columns.value);
  selectedData.value = data?.value?.slice(0, pageCount.value);
  isLoading.value = false;
  console.log("mounted called ", selectedColumns.value);
});

const init = computed(() => {
  console.log("init called ", selectedColumns.value);
  selectedData.value = data?.value?.slice(0, pageCount.value);
  filteredData.value = data?.value;
});

init;

watch(filterValues.value, (newData) => {
  isLoading.value = true;
  console.log("queryFilter is ", filterValues.value, " now ", newData);
  filteredRows();
  isLoading.value = false;
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

const filteredRows = () => {
  isLoading.value = true;
  const keys = Object.keys(filterValues.value);
  let response = data.value;
  console.log("Kyes are ", keys);
  keys.forEach((key) => {
    if (!filterValues.value[key]) {
      response.value = data?.value?.slice(0, pageCount.value);
    }
    const res = response.filter((user) => {
      return String(user[key]) // <-- this line was changed to target 'username' only
        .toLowerCase()
        .includes(filterValues.value[key].toLowerCase());
    });
    response = res;
  });
  selectedData.value = response.slice(0, pageCount.value);
  filteredData.value = response;
};

const getColumnArray = (col) => {
  const res = [];
  col.map((c) => {
    res.push(c);
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

const sortTable = (key) => {
  // if the same key is clicked, reverse the sort order
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
  filteredData.value = filteredData.value.sort((a, b) => {
    let modifier = 1;
    if (sortOrder.value === "desc") modifier = -1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
    return 0;
  });
  selectedData.value = filteredData.value.slice(0, pageCount.value);
};

const isHTML = (str) => {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1); // Node type 1 is an element node
};
</script>
