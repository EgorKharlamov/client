<template>
  <div class="mt-5 flex flex-col">
    <button
      type="button"
      class="px-2 py-1 bg-blue-400 rounded text-white self-end flex items-center"
      @click="modalCreateOpened = true"
    >
      <plus-icon :class="$style.plusIcon" />
      <span class="ml-1">{{ $t("vpns.add") }}</span>
    </button>
    <div>
      <v-table
        :headers="headers"
        :rows="vpnsForTable"
        :current-page="currentPage"
        :last-page="lastPage"
        @search="debouncedSearchQuery"
        @page:next="pageNext"
        @page:prev="pagePrev"
      >
        <template #actions="{ row: vpn }">
          <button
            v-if="vpn?.status !== VpnStatus.Approved"
            type="button"
            :class="$style.deleteBtn"
            @click="approveVpnClick(vpn?.name)"
          >
            {{ $t("vpns.approve") }}
          </button>
          <div v-else>-</div>
        </template>
      </v-table>
    </div>
    <v-modal-add-vpn
      v-if="modalCreateOpened"
      @close:x="modalCreateOpened = false"
      @close="modalCreateOpened = false"
    />
    <v-modal-approve-vpn-confirm
      v-if="modalApproveOpened"
      :name="modalApproveName"
      @close:x="modalApproveOpened = false"
      @close="modalApproveOpened = false"
    />
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import { capitalize } from "lodash-es";
import { useVpn } from "~/composables/useVpn";
import VModalAddVpn from "~/components/modal/vpn/VModalAddVpn.vue";
import VModalApproveVpnConfirm from "~/components/modal/vpn/VModalApproveVpnConfirm.vue";
import { VpnStatus } from "~/api/constants";
import VTable from "~/components/VTable.vue";
import { useUserStore } from "~/store/userStore";

definePageMeta({
  middleware: ["auth", "client"],
  layout: "tabs",
});

const { isItMe } = useUserStore();

const {
  loadVpns,
  getVpns,
  modalApproveOpened,
  modalCreateOpened,
  approveVpnClick,
  modalApproveName,
  pageNext,
  pagePrev,
  currentPage,
  lastPage,
  debouncedSearchQuery,
} = useVpn();

const { t } = useI18n();
const createByUserId = (id: number) => {
  if (isItMe(id)) return capitalize(t("vpns.tableBodyCellCreator"));
  return id;
};
const headers = computed(() => [
  t("vpns.tableHeaders.id"),
  t("vpns.tableHeaders.userId"),
  t("vpns.tableHeaders.name"),
  t("vpns.tableHeaders.serverAddr"),
  t("vpns.tableHeaders.userEmail"),
  t("vpns.tableHeaders.status"),
]);
const vpnsForTable = computed(() =>
  getVpns.value.map((vpn) => ({
    id: vpn.id,
    createdByUserId: createByUserId(vpn.createdByUserId),
    name: vpn.name,
    serverAddr: vpn.serverAddr,
    forUserEmail: vpn.forUserEmail,
    status: vpn.status,
  }))
);

await loadVpns();
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
  @apply py-0.5 text-xs px-1 rounded bg-green-500 text-white hover:bg-green-600 transition;
}

.plusIcon {
  @apply h-[20px] w-[20px];
}
</style>
