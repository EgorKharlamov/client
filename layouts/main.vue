<template>
  <div>
    <v-header />
    <div :class="$style.container">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
const toast = useToast();

try {
  await userStore.loadCurrentUser();
} catch (e) {
  toast.error(e);
}
</script>

<style module>
.container {
  @apply max-w-[800px] border mx-auto mt-5;
}
</style>
