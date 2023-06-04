<template>
  <div :class="$style.bg">
    <div :class="$style.container">
      <button type="button" :class="$style.buttonExit" @click="emit('close')">
        <x-mark-icon :class="$style.icon" />
      </button>
      <h1>modal</h1>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["close"]);
</script>

<style module>
.bg {
  @apply flex items-center justify-center w-[100vw] h-[100vh] border fixed top-0 left-0 bg-gray-500/50;
}

.container {
  @apply min-w-[500px] min-h-[200px] bg-gray-100 relative;
}

.buttonExit {
  @apply absolute right-0 top-0 p-1.5;
}

.icon {
  @apply w-[20px] h-[20px];
}
</style>
