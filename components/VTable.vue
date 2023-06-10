<template>
  <div :class="$style.container">
    <div :class="$style.filters">
      <input
        type="text"
        :placeholder="capitalize($t('typeToSearch'))"
        :class="$style.input"
        class="dark:bg-gray-800"
        @input="searchQuery"
      />
    </div>
    <table class="darkTable" :class="$style.table">
      <tr>
        <th
          v-for="(header, i) in headers"
          :key="i"
          :class="$style.cell"
          class="darkCell"
        >
          {{ capitalize(header) }}
        </th>
        <th :class="$style.cell" class="darkCell">
          {{ capitalize($t("servers.tableHeader.actions")) }}
        </th>
      </tr>
      <tr
        v-for="(row, i) in rows"
        :key="row?.id || i"
        :class="$style.row"
        class="darkRow"
      >
        <td
          v-for="(key, j) in Object.keys(row)"
          :key="j"
          :class="$style.cell"
          class="darkCell"
        >
          {{ row[key] }}
        </td>
        <td :class="$style.cell" class="darkCell">
          <slot name="actions" :row="row" />
        </td>
      </tr>
    </table>
    <div v-if="lastPage > 1" :class="$style.paginator" class="darkPaginator">
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
import { capitalize } from "lodash-es";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  headers: string[];
  rows: [];
  currentPage: number;
  lastPage: number;
}>();

const emit = defineEmits(["page:next", "page:prev", "search"]);
const clickNext = () => emit("page:next");
const clickPrev = () => emit("page:prev");
const searchQuery = (e) => emit("search", e.target.value);

const headers = computed(() => props.headers);
</script>

<style scoped>
.darkTable {
  @apply dark:text-gray-400 dark:bg-gray-800;
}
.darkCell {
  @apply dark:border-gray-600;
}
.darkPaginator {
  @apply dark:text-gray-300;
}
.darkBtn {
  @apply dark:text-gray-300 dark:bg-gray-800 dark:disabled:bg-gray-600;
}
.darkRow:hover td {
  @apply dark:bg-gray-900;
}
</style>

<style module>
.container {
  @apply flex flex-col mt-2;
}
.table {
  @apply table-auto w-full mt-2;
}
.row:hover td {
  @apply bg-gray-200;
}
.cell {
  @apply text-center border;
}

.paginator {
  @apply flex gap-2 items-end justify-end mt-2;
}

.button {
  @apply py-1 px-2 bg-blue-400 hover:bg-blue-500 disabled:hover:bg-blue-300 disabled:bg-blue-300 rounded text-white;
}

.input {
  @apply py-1 px-2 items-end justify-self-end inline-block max-w-[300px] rounded;
}

.filters {
  @apply flex justify-end;
}
</style>
