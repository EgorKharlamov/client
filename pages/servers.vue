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
      <v-table
        :headers="headers"
        :rows="serversForTable"
        :current-page="currentPage"
        :last-page="lastPage"
        @search="debouncedSearchQuery"
        @page:next="pageNext"
        @page:prev="pagePrev"
      >
        <template #actions="{ row: server }">
          <button
            type="button"
            :class="$style.deleteBtn"
            @click="onDeleteClickHandler(server.name)"
          >
            delete
          </button>
        </template>
      </v-table>
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
import VTable from "~/components/VTable.vue";

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
  pageNext,
  pagePrev,
  currentPage,
  lastPage,
  debouncedSearchQuery,
} = useServer();

const headers = ["id", "name", "address", "maximum users", "available slots"];

const serversForTable = computed(() =>
  getServers.value.map((server) => ({
    id: server.id,
    name: server.name,
    addr: server.addr,
    maxUsers: server.maxUsers,
    availableSlots: server.availableSlots,
  }))
);

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
