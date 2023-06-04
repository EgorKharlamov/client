<template>
  <div>
    <v-header />
    <div :class="$style.container">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
await userStore.loadCurrentUser();
</script>

<style module>
.container {
  @apply max-w-[800px] border mx-auto mt-5;
}
</style>
