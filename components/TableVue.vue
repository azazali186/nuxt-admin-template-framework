<template>
  <div class="table-view">
    <div class="table-title text-center text-2xl font-bold mb-5">
      {{ title || "Welcome to UI Framework World" }}
    </div>
    <div
      class="px-10 py-3 flex justify-center items-center bg-transparent w-full gap-5 relative overflow-x-auto"
    >
      <table class="table w-full text-sm text-left" v-if="data?.length > 0">
        <thead class="text-xs uppercase sticky top-0">
          <tr>
            <td
            scope="col"
              :class="' text-center '+classString"
              >
              #
            </td>
            <th
              scope="col"
              :class="' text-center '+classString"
              v-for="col in columns"
            >
              {{ col.name }}
            </th>
            <th
              scope="col"
              :class="' text-center '+classString"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data">
            <td :class="' text-center '+classString">
              {{index + 1 }}
            </td>
            <td
              :class="col?.align ? ' text-'+col.align+' '+classString : classString"
              v-for="col in columns"
            >
              {{ item[col.name] }}
            </td>
            <td
              :class="classString"
            >
              <div class="flex justify-evenly">
                <span
                  class="bg-transparent border-2 px-3 py-1 border-white rounded-full cursor-pointer hover:border-10 hover:border-purple-300 hover:transition hover:ease-in-out focus:border-purple-600 hover:text-purple-300"
                  >edit</span
                >
                <span
                  class="bg-transparent border-2 px-3 py-1 border-white rounded-full cursor-pointer hover:border-10 hover:border-purple-300 hover:transition hover:ease-in-out focus:border-purple-600 hover:text-purple-300"
                  >delete</span
                >
                <span
                  class="bg-transparent border-2 px-3 py-1 border-white rounded-full cursor-pointer hover:border-10 hover:border-purple-300 hover:transition hover:ease-in-out focus:border-purple-600 hover:text-purple-300"
                  >approve</span
                >
                <span
                  class="bg-transparent border-2 px-3 py-1 border-white rounded-full cursor-pointer hover:border-10 hover:border-purple-300 hover:transition hover:ease-in-out focus:border-purple-600 hover:text-purple-300"
                  >pending</span
                >
                <span
                  class="bg-transparent border-2 px-3 py-1 border-white rounded-full cursor-pointer hover:border-10 hover:border-purple-300 hover:transition hover:ease-in-out focus:border-purple-600 hover:text-purple-300"
                  >cancelled</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>No Data Available</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ data: Array, title: String, columns: Array });
const data = ref(props.data);
const title = ref(props.title);
const columns = ref(props.columns);
const classString = ref("px-6 py-3 bg-transparent border-2 border-solid border-white")
onMounted(() => {
  if (!columns.value)
    if (data?.value?.length > 0) {
      columns.value = getColumnName(Object.keys(data.value[0]));
    }
});

const getColumnName = (columnsName) => {
  const data = [];
  columnsName.map((n) => {
    data.push({
      name: n,
    });
  });
  return data
};
</script>
