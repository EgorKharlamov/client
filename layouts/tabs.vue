<template>
  <div>
    <v-header />
    <div :class="$style.container">
      <div :class="$style.links">
        <nuxt-link
          v-if="canUserLoadServers() || canUserLoadVpns()"
          to="/"
          :class="{ [$style.link]: true, [$style.linkActive]: activeRouteHome }"
          class="darkLink"
          :data-active="activeRouteHome"
          >{{ $t("layout.tabs.home") }}</nuxt-link
        >
        <nuxt-link
          v-if="canUserLoadVpns()"
          to="/vpns"
          :class="{ [$style.link]: true, [$style.linkActive]: activeRouteVpn }"
          class="darkLink"
          :data-active="activeRouteVpn"
          >{{ $t("layout.tabs.vpn") }}</nuxt-link
        >
        <nuxt-link
          v-if="canUserLoadServers()"
          to="/servers"
          :class="{
            [$style.link]: true,
            [$style.linkActive]: activeRouteServer,
          }"
          class="darkLink"
          :data-active="activeRouteServer"
          >{{ $t("layout.tabs.servers") }}</nuxt-link
        >
        <nuxt-link
          v-if="canUserLoadUsers()"
          to="/users"
          :class="{
            [$style.link]: true,
            [$style.linkActive]: activeRouteUsers,
          }"
          class="darkLink"
          :data-active="activeRouteUsers"
          >{{ $t("layout.tabs.users") }}</nuxt-link
        >
      </div>
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

const route = useRoute();
const activeRouteHome = computed(() => route.path === "/");
const activeRouteServer = computed(() => route.path === "/servers");
const activeRouteVpn = computed(() => route.path === "/vpns");
const activeRouteUsers = computed(() => route.path === "/users");
</script>

<style scoped>
.darkLink {
  @apply dark:border-gray-900 dark:bg-gray-800 dark:text-gray-400;
}
.darkLink[data-active="true"] {
  @apply dark:bg-gray-900 dark:text-gray-300;
}
</style>

<style module>
.container {
  @apply max-w-[1500px]  mx-auto mt-1 px-2 py-1 sm:mt-5;
}

.links {
  @apply flex gap-3 overflow-auto;
  scrollbar-width: none;
}

.link {
  @apply py-1 px-2 border-2 border-blue-400 rounded-xl text-black;
}

.linkActive {
  @apply py-1 px-2 bg-blue-400 rounded-xl text-gray-100;
}
</style>
