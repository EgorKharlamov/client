<template>
  <div class="darkBody">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";

useDark();

const { locale } = useI18n();
const cookie = useCookie("lang");
if (cookie?.value) locale.value = cookie.value;
</script>
<style>
@import "assets/css/tailwind.css";

body.modal-opened {
  overflow: hidden;
}

body {
  @apply dark:bg-gray-700 dark:text-gray-300;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
