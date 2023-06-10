<template>
  <div class="mt-5 flex flex-col">
    <button
      type="button"
      class="px-2 py-1 bg-blue-400 hover:bg-blue-500 dark:bg-gray-900 dark:hover:bg-gray-950 dark:text-gray-400 rounded text-white self-end flex items-center"
      @click="modalCreateOpened = true"
    >
      <plus-icon :class="$style.plusIcon" />
      <span class="ml-1 mb-0.5">{{ $t("vpns.add") }}</span>
    </button>
    <div>
      <v-table
        v-if="width >= 640"
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
            :class="$style.approveBtn"
            class="darkApproveBtn"
            @click="approveVpnClick(vpn?.name)"
          >
            {{ $t("vpns.approve") }}
          </button>
          <div v-else>-</div>
        </template>
      </v-table>

      <v-mobile-table-vpn
        :class="$style.mobileTable"
        :rows="vpnsForTableMobile"
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
            :class="$style.approveBtnMobile"
            class="darkApproveBtnMobile"
            @click="approveVpnClick(vpn?.name)"
          >
            {{ $t("vpns.approve") }}
          </button>
        </template>
      </v-mobile-table-vpn>
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
import { useWindowSize } from "@vueuse/core";
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

defineOptions({
  inheritAttrs: false,
});

const { width } = useWindowSize();

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

const vpnsForTableMobile = computed(() =>
  getVpns.value.map((vpn) => ({
    name: vpn.name,
    forUserEmail: vpn.forUserEmail,
    status: vpn.status,
  }))
);

await loadVpns();
</script>

<style scoped>
.darkApproveBtn,
.darkApproveBtnMobile {
  @apply dark:bg-green-900 dark:hover:bg-green-800 dark:text-gray-300 dark:hover:text-gray-200;
}
</style>
<style module>
.mobileTable {
  @apply table-auto w-full mt-2 sm:hidden;
}
.row:hover td {
  @apply bg-gray-200;
}
.cell {
  @apply text-center border;
}

.approveBtn {
  @apply py-0.5 text-xs px-1 rounded bg-green-500 text-white hover:bg-green-600 transition;
}

.approveBtnMobile {
  @apply py-2 text-base px-3 rounded bg-green-500 text-white hover:bg-green-600 transition;
}

.plusIcon {
  @apply h-[20px] w-[20px];
}
</style>
