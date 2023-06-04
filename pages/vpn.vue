<template>
  <div class="mt-5 flex flex-col">
    <button
      type="button"
      class="px-2 py-1 bg-blue-400 rounded text-white self-end flex items-center"
      @click="modalCreateOpened = true"
    >
      <plus-icon :class="$style.plusIcon" />
      <span class="ml-1">vpn</span>
    </button>
    <div>
      <table :class="$style.table">
        <tr>
          <th :class="$style.cell">id</th>
          <th :class="$style.cell">user id</th>
          <th :class="$style.cell">name</th>
          <th :class="$style.cell">server addr</th>
          <th :class="$style.cell">user email</th>
          <th :class="$style.cell">status</th>
          <th :class="$style.cell">actions</th>
        </tr>
        <tr v-for="vpn in getVpns" :key="vpn?.id" :class="$style.row">
          <td :class="$style.cell">{{ vpn?.id }}</td>
          <td :class="$style.cell">{{ vpn?.createdByUserId }}</td>
          <td :class="$style.cell">{{ vpn?.name }}</td>
          <td :class="$style.cell">{{ vpn?.serverAddr }}</td>
          <td :class="$style.cell">{{ vpn?.forUserEmail }}</td>
          <td :class="$style.cell">{{ vpn?.status }}</td>
          <td :class="$style.cell">
            <button
              v-if="vpn.status !== VpnStatus.Approved"
              type="button"
              :class="$style.deleteBtn"
              @click="approveVpnClick(vpn.name)"
            >
              approve
            </button>
            <div v-else>-</div>
          </td>
        </tr>
      </table>
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

<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useVpn } from "~/composables/useVpn";
import VModalAddVpn from "~/components/modal/vpn/VModalAddVpn.vue";
import VModalApproveVpnConfirm from "~/components/modal/vpn/VModalApproveVpnConfirm.vue";
import { VpnStatus } from "~/api/constants";

definePageMeta({
  middleware: ["auth", "manager", "client"],
  layout: "tabs",
});

const {
  loadVpns,
  getVpns,
  modalApproveOpened,
  modalCreateOpened,
  approveVpnClick,
  modalApproveName,
} = useVpn();

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
