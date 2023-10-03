<template>
  <NuxtLayout>
    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: '',
        header: { padding: 'px-4 py-5' },
        body: {
          padding: '',
          base: '',
        },
        footer: { padding: 'p-4' },
      }"
    >
      <template #header>
        <h2 class="font-semibold text-center text-xl leading-tight">
          User Management
        </h2>
      </template>

      <!-- Filters -->
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput
          class="ml-4 bg-transparent border-none outline-none ring-opacity-0 filter-search"
          v-model="search"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search..."
        />

        <USelectMenu
          v-model="selectedStatus"
          :options="todoStatus"
          multiple
          placeholder="Status"
          class="w-40 text-white filter-select"
        />
      </div>

      <!-- Header and Action buttons -->
      <div class="flex justify-between items-center w-full px-4 py-3">
        <div class="flex items-center gap-1.5">
          <span class="text-sm leading-5">Rows per page:</span>

          <USelect
            v-model="pageCount"
            :options="[3, 5, 10, 20, 30, 40]"
            class="me-2 w-20 rows-select"
            size="xs"
          />
        </div>

        <div class="flex gap-1.5 items-center">
          <UDropdown
            v-if="selectedRows.length > 1"
            :items="actions"
            :ui="{ width: 'w-36' }"
          >
            <UButton
              icon="i-heroicons-chevron-down"
              trailing
              variant="soft"
              size="xs"
            >
              Mark as
            </UButton>
          </UDropdown>

          <USelectMenu v-model="selectedColumns" :options="columns" multiple>
            <UButton icon="i-heroicons-view-columns" variant="soft" size="xs">
              Columns
            </UButton>
          </USelectMenu>

          <UButton
            icon="i-heroicons-funnel"
            variant="soft"
            color="red"
            size="xs"
            :disabled="search === '' && selectedStatus.length === 0"
            @click="resetFilters"
          >
            Reset
          </UButton>
        </div>
      </div>

      <!-- Table -->
      <UTable
        v-model="selectedRows"
        :rows="todos"
        :columns="columnsTable"
        :loading="pending"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        @select="select"
      >
        <template #completed-data="{ row }">
          <UBadge
            size="xs"
            :label="row.completed ? 'Completed' : 'In Progress'"
            :color="row.completed ? 'emerald' : 'orange'"
            variant="subtle"
          />
        </template>

        <template #actions-data="{ row }">
          <UButton
            v-if="!row.completed"
            icon="i-heroicons-check"
            size="2xs"
            color="emerald"
            variant="outline"
            :ui="{ rounded: 'rounded-full' }"
            square
          />

          <UButton
            v-else
            icon="i-heroicons-arrow-path"
            size="2xs"
            color="orange"
            variant="outline"
            :ui="{ rounded: 'rounded-full' }"
            square
          />
        </template>
      </UTable>

      <!-- Number of rows & Pagination -->
      <template #footer>
        <div class="flex justify-between items-center">
          <div>
            <span class="text-sm leading-5">
              Showing
              <span class="font-medium">{{ pageFrom }}</span>
              to
              <span class="font-medium">{{ pageTo }}</span>
              of
              <span class="font-medium">{{ pageTotal }}</span>
              results
            </span>
          </div>

          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="pageTotal"
            class="pagination-block"
            :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: '!rounded-full min-w-[32px] justify-center',
              default: {
                activeButton: {
                  variant: 'outline',
                },
              },
            }"
          >
            <template #prev="{ onClick }">
              <UTooltip text="Previous page" class="text-white bg-transparent">
                <UButton
                  icon="i-heroicons-arrow-small-left-20-solid"
                  color="primary"
                  :ui="{ rounded: 'rounded-full' }"
                  class="rtl:[&_span:first-child]:rotate-180 me-2"
                  @click="onClick"
                />
              </UTooltip>
            </template>
            <template #next="{ onClick }">
              <UTooltip text="Next page">
                <UButton
                  icon="i-heroicons-arrow-small-right-20-solid"
                  color="primary"
                  :ui="{ rounded: 'rounded-full' }"
                  class="rtl:[&_span:last-child]:rotate-180 ms-2"
                  @click="onClick"
                />
              </UTooltip>
            </template>
          </UPagination>
        </div>
      </template>
    </UCard>
  </NuxtLayout>
</template>


<script setup>
// Columns
const columns = [
  {
    key: "id",
    label: "#",
    sortable: true,
    class: "text-white",
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
    class: "text-white",
  },
  {
    key: "completed",
    label: "Status",
    sortable: true,
    class: "text-white",
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
    class: "text-white",
  },
];

const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

// Selected Rows
const selectedRows = ref([]);

function select(row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }
}

// Actions
const actions = [
  [
    {
      key: "completed",
      label: "Completed",
      icon: "i-heroicons-check",
      class: "text-white",
    },
  ],
  [
    {
      key: "uncompleted",
      label: "In Progress",
      icon: "i-heroicons-arrow-path",
      class: "text-white",
    },
  ],
];

// Filters
const todoStatus = [
  {
    key: "uncompleted",
    label: "In Progress",
    value: false,
    class: "text-white",
  },
  {
    key: "completed",
    label: "Completed",
    value: true,
    class: "text-white",
  },
];

const search = ref("");
const selectedStatus = ref([]);
const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return "";
  }

  if (selectedStatus?.value?.length > 1) {
    return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`;
  }

  return `?completed=${selectedStatus.value[0].value}`;
});

const resetFilters = () => {
  search.value = "";
  selectedStatus.value = [];
};

// Pagination
const page = ref(1);
const pageCount = ref(10);
const pageTotal = ref(200); // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

// Data
const { data: todos, pending } = await useLazyAsyncData(
  "todos",
  () =>
    $fetch(`https://jsonplaceholder.typicode.com/todos${searchStatus.value}`, {
      query: {
        q: search.value,
        _page: page.value,
        _limit: pageCount.value,
      },
    }),
  {
    default: () => [],
    watch: [page, search, searchStatus, pageCount],
  }
);
</script>


