<template>
  <div :class="$style.container">
    <div>Admin panel</div>
    <div :class="$style.rightBlock">
      <span v-show="userStore.getUserName">{{ userStore.getUserName }}</span>
      <button type="button" @click="userStore.logOut">
        <arrow-right-on-rectangle-icon :class="$style.icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightOnRectangleIcon } from "@heroicons/vue/24/solid";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
</script>

<style module>
.container {
  @apply bg-blue-300 flex justify-between p-3;
}

.rightBlock {
  @apply flex gap-3;
}

.icon {
  @apply h-[20px];
}
</style>
