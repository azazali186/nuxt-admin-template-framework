<template>
  <NuxtLayout>
    <div class="bg-transparent-all">
      <TableVue
        v-if="data"
        title="Members Management"
        :data="data"
        :columns="column"
        :filters="filters"
      />
    </div>
  </NuxtLayout>
</template>

<script setup>

import { useCommonAPIStore } from "~/store/commonAPIStore";
import { useAuthStore } from "~/store/auth";
import { BASE_URL } from "~/constants";
const apiStore = useCommonAPIStore();
const authStore = useAuthStore();

const requestParams = ref({
  email: "",
  startDate: "",
  endDate: "",
});
const url = ref(BASE_URL + "/users");

const data = ref();

const column = ref([
  {
    name: "id",
    sort: true,
    align: "left",
  },
  {
    name: "Role",
    sort: true,
    align: "center",
    value: "roles.name"
  },
  {
    name: "username",
    sort: true,
    align: "center",
  },
  {
    name: "status",
    sort: true,
    align: "center",
  },
  {
    name: "isActive",
    sort: true,
    align: "center",
  },
  {
    name: "created_at",
    sort: true,
    align: "center",
  },
  {
    name: "action",
    sort: false,
    align: "center",
  },
]);

const filters = ref({
  search: [
    {
      name: "username",
    }
  ],
  date:[
    {
      name: 'created_at'
    }
  ]
});

const totalCount = ref();

const actionCssClass =
  "bg-transparent-all border-2 px-3 py-1 border-primary rounded-full uppercase cursor-pointer hover:border-10 hover:border-purple-300 hover:transition hover:ease-in-out focus:border-purple-600 hover:text-purple-300";

const action = `<div class="flex justify-center bg-transparent-all gap-2">
                <span class="${actionCssClass}">edit</span>
                <span class="${actionCssClass}">delete</span>
                <span class="${actionCssClass}">approve</span>
                <span class="${actionCssClass}">reject</span>
                <span class="${actionCssClass}">cancelled</span>
              </div>`;

onMounted(async () => {
  let token = authStore.auth.token;
  console.log("Mounted token = " + token);
  const res = await apiStore.getAPIRequest(
    requestParams.value,
    url.value,
    token
  );
  console.log("res = ", res);

  if (res.status === 200 ) {
    data.value = res.data.data.list;
    data.value.forEach((person) => (person.action = action));
    totalCount.value = res.data.totalCount;
  }
});
</script>
