<template>
  <div>
    <p class="text-red-600 text-[16px]">Hello from index</p>
    <button
      type="button"
      class="px-3 py-2 bg-blue-400 rounded text-white"
      @click="loadServers"
    >
      get servers
    </button>
    <button
      type="button"
      class="ml-5 px-3 py-2 bg-blue-400 rounded text-white"
      @click="logout"
    >
      logout
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "#app";
import { useApi } from "~/composables/useApi";
import { Method } from "~/api/constants";

definePageMeta({
  middleware: "auth",
});

const auth = useCookie("auth");
const router = useRouter();

const loadServers = async () => {
  await useApi(Method.GET, "/servers");
};

const logout = () => {
  auth.value = "";
  router.push("/auth");
};
</script>
