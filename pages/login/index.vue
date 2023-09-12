<template>
  <div class="flex justify-center items-center w-100 h-screen">
    <UCard class="bg-transparent-all">
      <UForm :validate="validate" :state="state" @submit="submit">
        <UFormGroup label="Username" name="username" class="my-3 ">
          <UInput v-model="state.username" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" class="mt-3"> Submit </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const state = ref({
  username: undefined,
  password: undefined,
});

import { useCommonAPIStore } from "~/store/commonAPIStore";
import { useAuthStore } from "~/store/authStore";
const store = useCommonAPIStore();
import { BASE_URL } from '~/constants'
const authStore = useAuthStore();
const validate = (state) => {
  const errors = [];
  if (!state.username) errors.push({ path: "username", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function submit(event) {
  console.log(event.data);
  const res = await store.postAPIRequest(state.value, BASE_URL+ '/vip-member/Public/login', true)
  console.log("function response " , res)
  authStore.setAuth(res.data)
  if(res.code === 0){
    router.push('/')
  }
  
}
</script>
