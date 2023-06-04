<template>
  <div :class="$style.container">
    <h3>Text</h3>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "tabs",
});
</script>

<style module>
.container {
  @apply max-w-[800px];
}

.links {
  @apply flex gap-3;
}

.link {
  @apply py-1 px-2 border-2 border-blue-400 rounded-xl text-black;
}

.linkActive {
  @apply py-1 px-2 bg-blue-400 rounded-xl text-gray-100;
}
</style>
