<template>
  <div :class="$style.container">
    <div>{{ $t("vpn") }}</div>
    <div :class="$style.rightBlock">
      <button type="button" @click="toggle">{{ $t("toggleLang") }}</button>
      <div v-show="userStore.getUserName">
        <span>{{ userStore.getUserName }}</span>
        <span class="italic text-sm"> #{{ getUser?.id }}</span>
      </div>
      <button type="button" @click="userStore.logOut">
        <arrow-right-on-rectangle-icon :class="$style.icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightOnRectangleIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/userStore";
import { Locale } from "~/i18n/constants";

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
