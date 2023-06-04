<template>
  <div class="mt-5 flex flex-col">
    <button
      type="button"
      class="px-2 py-1 bg-blue-400 rounded text-white self-end flex items-center"
      @click="modalOpened = true"
    >
      <plus-icon :class="$style.plusIcon" />
      <span class="ml-1">server</span>
    </button>
    <div>
      <table :class="$style.table">
        <tr>
          <th :class="$style.cell">id</th>
          <th :class="$style.cell">name</th>
          <th :class="$style.cell">address</th>
          <th :class="$style.cell">maximum users</th>
          <th :class="$style.cell">available slots</th>
          <th :class="$style.cell">actions</th>
        </tr>
        <tr v-for="server in getServers" :key="server?.id" :class="$style.row">
          <td :class="$style.cell">{{ server?.id }}</td>
          <td :class="$style.cell">{{ server?.name }}</td>
          <td :class="$style.cell">{{ server?.addr }}</td>
          <td :class="$style.cell">{{ server?.maxUsers }}</td>
          <td :class="$style.cell">{{ server?.availableSlots }}</td>
          <td :class="$style.cell">
            <button
              type="button"
              :class="$style.deleteBtn"
              @click="onDeleteClickHandler(server.name)"
            >
              delete
            </button>
          </td>
        </tr>
      </table>
    </div>
    <v-modal-add-server
      v-if="modalOpened"
      @close:x="modalOpened = false"
      @close="modalOpened = false"
    />
    <v-modal-delete-server-confirm
      v-if="modalDeleteConfirmOpened"
      :name="serverDeleteName"
      @close:x="modalDeleteConfirmOpened = false"
      @close="modalDeleteConfirmOpened = false"
    />
  </div>
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import VModalAddServer from "~/components/modal/server/VModalAddServer.vue";
import VModalDeleteServerConfirm from "~/components/modal/server/VModalDeleteServerConfirm.vue";
import { useServer } from "~/composables/useServer";

definePageMeta({
  middleware: ["auth", "manager", "client"],
  layout: "tabs",
});

const {
  loadServers,
  modalOpened,
  modalDeleteConfirmOpened,
  getServers,
  onDeleteClickHandler,
  serverDeleteName,
} = useServer();

await loadServers();
</script>

<style module>
.table {
  @apply table-auto w-full mt-2;
}
.row:hover td {
  @apply bg-gray-200;
}

.cell {
  @apply text-center border;
}

.deleteBtn {
  @apply py-0.5 text-xs px-1 rounded bg-red-500 text-white hover:bg-red-600 transition;
}

.plusIcon {
  @apply h-[20px] w-[20px];
}
</style>
