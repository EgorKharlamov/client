<template>
  <div>
    <h1>Vpn</h1>
  </div>
</template>

<script setup>
import { useVpnsStore } from "~/store/vpnsStore";

definePageMeta({
  middleware: ["auth", "client"],
  layout: "tabs",
});

const vpnStore = useVpnsStore();

await vpnStore.loadVpns();
</script>
