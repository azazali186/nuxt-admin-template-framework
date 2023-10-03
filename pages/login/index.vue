<template>
  <div class="flex justify-center items-center w-100 h-screen">
    <UCard class="bg-transparent-all">
      <UForm :validate="validate" :state="state" @submit="submit">
        <UFormGroup label="Email" name="email" class="my-3 ">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" class="mt-3"> Submit </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lagn="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const state = ref({
  email: undefined,
  password: undefined,
});

import { useCommonAPIStore } from "~/store/commonAPIStore";
import { useAuthStore } from "~/store/auth";
const store = useCommonAPIStore();
import { BASE_URL } from '~/constants'
const authStore = useAuthStore();
const validate = (state) => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function submit(event) {
  console.log(event.data);
  const res = await store.postAPIRequest(state.value, BASE_URL+ '/auth-service/auth/login', false)
  console.log("function response " , res)
  
  if(res.status !== 401 || res.status !== 403) {
    authStore.setAuth(res.data)
    router.push('/')
  }
  
}
</script>
