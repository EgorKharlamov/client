<template>
  <div>
    <v-header />
    <div :class="$style.container">
      <div :class="$style.links">
        <nuxt-link
          v-if="canUserLoadServers() || canUserLoadVpns()"
          to="/"
          :class="{ [$style.link]: true, [$style.linkActive]: activeRouteHome }"
          >Home</nuxt-link
        >
        <nuxt-link
          v-if="canUserLoadVpns()"
          to="/vpn"
          :class="{ [$style.link]: true, [$style.linkActive]: activeRouteVpn }"
          >Vpn</nuxt-link
        >
        <nuxt-link
          v-if="canUserLoadServers()"
          to="/server"
          :class="{
            [$style.link]: true,
            [$style.linkActive]: activeRouteServer,
          }"
          >Servers</nuxt-link
        >
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
await userStore.loadCurrentUser();

const route = useRoute();
const activeRouteHome = computed(() => route.path === "/");
const activeRouteServer = computed(() => route.path === "/server");
const activeRouteVpn = computed(() => route.path === "/vpn");
</script>

<style module>
.container {
  @apply max-w-[800px]  mx-auto mt-5;
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
