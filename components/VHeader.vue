<template>
  <div
    class="bg-blue-300 dark:bg-gray-800 flex justify-between p-3 select-none dark:text-gray-300"
  >
    <div>{{ $t("vpn") }}</div>
    <div class="flex gap-3">
      <button type="button" class="iconTheme">
        <sun-icon v-show="isDark" @click="toggleCustom" />
        <moon-icon v-show="!isDark" @click="toggleCustom" />
      </button>
      <button type="button" @click="toggle">{{ $t("toggleLang") }}</button>
      <div v-show="userStore.getUserName">
        <span>{{ userStore.getUserName }}</span>
        <span class="italic text-sm"> #{{ getUser?.id }}</span>
      </div>
      <button type="button" @click="userStore.logOut">
        <arrow-right-on-rectangle-icon class="h-[20px]" />
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { useDark, useToggle } from "@vueuse/core";
import { useUserStore } from "~/store/userStore";
import { Locale } from "~/i18n/constants";

const isDark = useDark();
const toggleCustom = () => toggleDark();
const toggleDark = useToggle(isDark);

const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);
const cookie = useCookie("lang");
const { locale } = useI18n();
const toggle = () => {
  switch (locale.value) {
    case Locale.En:
      locale.value = Locale.Ru;
      break;
    case Locale.Ru:
      locale.value = Locale.En;
      break;
    default:
      return Locale.Ru;
  }
  cookie.value = locale.value;
};
</script>

<style scoped>
.iconTheme {
  @apply w-[20px] h-[20px] self-center;
}
</style>
