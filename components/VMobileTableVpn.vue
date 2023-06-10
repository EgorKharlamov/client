<template>
  <div :class="$style.container">
    <table :class="$style.table">
      <tr
        v-for="(row, i) in rows"
        :key="row?.id || i"
        :class="$style.row"
        class="rowDark"
      >
        <td :class="$style.cell">
          <div :class="$style.cellName">
            <span
              :class="{
                [$style.label]: true,
                [$style.labelApproved]: isApproved(row),
                [$style.labelWaitApprove]: isWaitApprove(row),
                [$style.labelDisabled]: isDisabled(row),
              }"
              class="label"
              :data-approved="isApproved(row)"
              :data-wait-approve="isWaitApprove(row)"
              :data-disabled="isDisabled(row)"
              >{{ row?.status }}</span
            >
            <span :class="$style.cellText">{{ row?.name }}</span>
            <span :class="$style.cellText">{{ row?.forUserEmail }}</span>
          </div>
        </td>
        <td :class="$style.cellActions">
          <slot name="actions" :row="row" />
        </td>
      </tr>
    </table>
    <div v-if="lastPage > 1" :class="$style.paginator">
      <button
        :class="$style.button"
        class="darkBtn"
        :disabled="currentPage === 1"
        @click="clickPrev"
      >
        &lt;
      </button>
      <div :class="$style.pages">{{ props.currentPage }}</div>
      <button
        :class="$style.button"
        class="darkBtn"
        :disabled="currentPage === lastPage"
        @click="clickNext"
      >
        &gt;
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { VpnStatus } from "~/api/constants";

const props = defineProps<{
  rows: [];
  currentPage: number;
  lastPage: number;
}>();

const emit = defineEmits(["page:next", "page:prev", "search"]);
const clickNext = () => emit("page:next");
const clickPrev = () => emit("page:prev");

const isApproved = (item) => item.status === VpnStatus.Approved;
const isWaitApprove = (item) => item.status === VpnStatus.WaitForApprove;
const isDisabled = (item) => item.status === VpnStatus.Disabled;
</script>

<style scoped>
.rowDark:hover {
  @apply dark:bg-gray-800;
}
.label[data-approved="true"] {
  @apply dark:bg-green-900;
}

.label[data-wait-approve="true"] {
  @apply dark:bg-blue-900;
}
.label[data-disabled="true"] {
  @apply dark:bg-red-900;
}
.darkBtn {
  @apply dark:bg-gray-800 dark:disabled:bg-gray-600;
}
</style>
<style module>
.container {
  @apply flex flex-col mt-2;
}
.table {
  @apply w-full mt-2;
}
.row {
  @apply border-b-2;
}
.row:hover {
  @apply bg-gray-200;
}
.cell {
  @apply text-center;
}
.cellActions {
  @apply text-center w-full h-full;
}
.cellName {
  @apply relative flex flex-col pt-4 items-start;
}

.paginator {
  @apply flex gap-2 items-center mt-2 justify-around;
}

.button {
  @apply py-2 px-4 bg-blue-400 hover:bg-blue-500 disabled:hover:bg-blue-300 disabled:bg-blue-300 rounded text-white;
}

.input {
  @apply py-1 px-2 items-end justify-self-end inline-block max-w-[300px] rounded;
}

.filters {
  @apply flex justify-end;
}

.pages {
  @apply text-xl;
}

.label {
  @apply text-xs p-0.5 rounded text-white italic absolute top-0;
}

.labelApproved {
  @apply bg-green-600;
}

.labelWaitApprove {
  @apply bg-blue-600;
}
.labelDisabled {
  @apply bg-red-600;
}

.cellText {
  @apply text-sm;
}
</style>
