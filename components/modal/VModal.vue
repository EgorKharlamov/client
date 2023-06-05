<template>
  <div :class="$style.bg">
    <div ref="target" :class="$style.container">
      <button type="button" :class="$style.buttonExit" @click="closeModal">
        <x-mark-icon :class="$style.icon" />
      </button>
      <div :class="$style.header">
        <slot name="header"></slot>
      </div>
      <div :class="$style.body">
        <slot />
      </div>
      <div :class="$style.footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["close:x"]);
const closeModal = () => {
  emit("close:x");
};

const target = ref(null);
onClickOutside(target, closeModal);

onMounted(() => {
  document.querySelector("body").classList.add("modal-opened");
});
onBeforeUnmount(() => {
  document.querySelector("body").classList.remove("modal-opened");
});
</script>

<style module>
.bg {
  @apply flex items-center justify-center w-[100vw] h-[100vh] border fixed top-0 left-0 bg-gray-500/50 overflow-hidden;
}

.container {
  @apply rounded min-w-[500px] min-h-[200px] bg-gray-100 relative flex flex-col justify-between py-2 px-3;
}

.buttonExit {
  @apply absolute right-0 top-0 p-1.5;
}

.icon {
  @apply w-[20px] h-[20px];
}

.header,
.footer,
.body {
  @apply p-1.5;
}

.footer {
  @apply flex justify-end;
}
</style>
