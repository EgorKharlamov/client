<template>
  <div>
    <h1>Servers</h1>
    <button
      v-if="canUserLoadServers()"
      type="button"
      class="px-2 py-1 bg-blue-400 rounded text-white"
      @click="loadServers"
    >
      fetch
    </button>
    <button
      v-if="canUserLoadServers()"
      type="button"
      class="px-2 py-1 bg-blue-400 rounded text-white"
      @click="modalOpened = true"
    >
      add server
    </button>
    <div>
      <table :class="$style.table">
        <tr>
          <th :class="$style.cell">id</th>
          <th :class="$style.cell">name</th>
          <th :class="$style.cell">addr</th>
          <th :class="$style.cell">maxUsers</th>
          <th :class="$style.cell">available slots</th>
        </tr>
        <tr v-for="server in getServers" :key="server.id">
          <td :class="$style.cell">{{ server.id }}</td>
          <td :class="$style.cell">{{ server.name }}</td>
          <td :class="$style.cell">{{ server.addr }}</td>
          <td :class="$style.cell">{{ server.maxUsers }}</td>
          <td :class="$style.cell">{{ server.availableSlots }}</td>
        </tr>
      </table>
    </div>
    <v-modal-add-server v-if="modalOpened" @close="modalOpened = false" />
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useServersStore } from "~/store/serversStore";
import VModalAddServer from "~/components/modal/VModalAddServer.vue";

definePageMeta({
  middleware: ["auth", "manager", "client"],
  layout: "tabs",
});
const modalOpened = ref(true);

const serverStore = useServersStore();
const { getServers } = storeToRefs(serverStore);
const toast = useToast();

const loadServers = async () => {
  try {
    await serverStore.loadServers();
  } catch (e) {
    toast.error(e.message);
  }
};
await loadServers();
</script>

<style module>
.table {
  @apply table-auto w-full mt-2;
}
.row {
  @apply flex gap-2;
}
.cell {
  @apply text-center border;
}
</style>
