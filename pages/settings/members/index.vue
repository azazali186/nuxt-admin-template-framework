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
import { useAuthStore } from "~/store/authStore";
import { BASE_URL } from "~/constants";
const apiStore = useCommonAPIStore();
const authStore = useAuthStore();

const requestParams = ref({
  username: "",
  status: "",
  citizen: "",
  startDate: "",
  endDate: "",
  offset: 0,
  limit: 100,
  memberCardNumber: "",
});
const url = ref(BASE_URL + "/vip-member/vip_member/get_list");

const data = ref();

const column = ref([
  {
    lable: "member card number",
    name: "cardNumber",
    sort: true,
    align: "left",
  },
  {
    lable: "User Id",
    name: "userId",
    sort: true,
    align: "left",
  },
  {
    lable: "member card number",
    name: "cardNumber",
    sort: true,
    align: "left",
  },
  {
    lable: "card uuid",
    name: "cardUUID",
    sort: true,
    align: "left",
  },
  {
    lable: "member card number",
    name: "cardNumber",
    sort: true,
    align: "left",
  },
  {
    lable: "member card number",
    name: "cardNumber",
    sort: true,
    align: "left",
  },
]);

const filters = ref({
  search: [
    {
      name: "userId",
    },
    {
      name: "cardNumber",
    },
    {
      name: "cardUUID",
    },
    {
      name: "name",
    },
    {
      name: "username",
    },
  ],
  date:[
    {
      name: 'createdAt'
    }
  ]
});

const totalCount = ref();

const actionCssClass =
  "bg-transparent-all border-2 px-3 py-1 border-white rounded-full uppercase cursor-pointer hover:border-10 hover:border-purple-300 hover:transition hover:ease-in-out focus:border-purple-600 hover:text-purple-300";

const action = `<div class="flex bg-transparent-all gap-2">
                <span class="${actionCssClass}">edit</span>
                <span class="${actionCssClass}">delete</span>
                <span class="${actionCssClass}">approve</span>
                <span class="${actionCssClass}">reject</span>
                <span class="${actionCssClass}">cancelled</span>
              </div>`;

onMounted(async () => {
  authStore.getToken;
  let token = authStore.token;
  console.log("Mounted token = " + token);
  const res = await apiStore.postAPIRequest(
    requestParams.value,
    url.value,
    false,
    token
  );
  console.log("res = ", res);

  if (res.code === 0) {
    data.value = res.data.list;
    data.value.forEach((person) => (person.action = action));
    totalCount.value = res.data.totalCount;

    column.value = getColumnsData(Object.keys(res.data.list[0]));
    console.log(" column.value  ", column.value);
  }
});

watch(column.value, (newData) => {
  console.log("Column new data ", newData);
});

const getColumnsData = (keysData) => {
  const result = [];
  keysData.forEach((k) => {

    if (k.toLowerCase().includes("id") || k.toLowerCase().includes("status")) {
      result.push({
        name: k,
        sort: true,
        align: "center",
      });
    } else if (k.toLowerCase().includes("photo") || k.toLowerCase().includes("code")) {

    } else {
      result.push({
        name: k,
        sort: true,
        align: "left",
      });
    }
  });
  return result;
};
</script>
