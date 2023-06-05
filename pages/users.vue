<template>
  <div class="mt-5 flex flex-col">
    <div>
      <v-table
        :headers="headers"
        :rows="usersForTable"
        :current-page="currentPage"
        :last-page="lastPage"
        @search="debouncedSearchQuery"
        @page:next="pageNext"
        @page:prev="pagePrev"
      >
        <template #actions="{ row: user }">
          <button
            type="button"
            :class="$style.deleteBtn"
            @click="deleteUserClick(user.id)"
          >
            delete
          </button>
        </template>
      </v-table>
    </div>

    <v-modal-delete-user-confirm
      v-if="modalApproveDeleteOpened"
      @close:x="modalApproveDeleteOpened = false"
      @close="modalApproveDeleteOpened = false"
    />
  </div>
</template>

<script setup>
import VTable from "~/components/VTable.vue";
import { useUsers } from "~/composables/useUsers";
import VModalDeleteUserConfirm from "~/components/modal/users/VModalDeleteUserConfirm.vue";

definePageMeta({
  middleware: ["auth", "manager", "client"],
  layout: "tabs",
});

const {
  getUsers,
  modalApproveDeleteOpened,
  lastPage,
  pagePrev,
  pageNext,
  debouncedSearchQuery,
  deleteUserClick,
  loadUsers,
  currentPage,
} = useUsers();

const headers = ["id", "name", "email", "phone"];
const usersForTable = computed(() =>
  getUsers?.value.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  }))
);

await loadUsers();
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
