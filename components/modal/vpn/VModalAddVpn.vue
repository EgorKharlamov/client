<template>
  <v-modal>
    <template #header>{{ tp("header") }}</template>
    <template #default>
      <div :class="$style.container">
        <label>
          <input
            v-model="forUserEmail"
            v-focus
            :class="$style.input"
            class="darkInput"
            type="email"
            :placeholder="tp('placeholderEmail')"
          />
        </label>
        <label>
          <input
            v-model="prefix"
            :class="$style.input"
            class="darkInput"
            type="text"
            :placeholder="tp('placeholderPrefix')"
          />
        </label>
      </div>
    </template>
    <template #footer>
      <div :class="$style.containerBtns">
        <button
          type="button"
          :class="[$style.button, $style.buttonCancel]"
          class="darkBtnCancel"
          @click="closeModal"
        >
          {{ tp("buttonCancel") }}
        </button>
        <button
          type="button"
          :class="[$style.button, $style.buttonCreate]"
          class="darkBtnCreate"
          :disabled="isLoading"
          @click="createVpnHandler"
        >
          {{ tp("buttonCreate") }}
        </button>
      </div>
    </template>
  </v-modal>
</template>
<script setup lang="ts">
import { capitalize } from "lodash-es";
import VModal from "~/components/modal/VModal.vue";
import { useVpn } from "~/composables/useVpn";

const emit = defineEmits(["close"]);
const { forUserEmail, prefix, isLoading, createVpn } = useVpn();
const { t } = useI18n();
const tp = (field: string) => capitalize(t(`vpns.modal.add.${field}`));
const closeModal = () => emit("close");
const createVpnHandler = async () => {
  await createVpn();
  closeModal();
};
</script>
<style scoped>
.darkInput {
  @apply dark:bg-gray-600 dark:text-gray-300 dark:border-gray-400  dark:focus:ring-gray-800;
}
.darkBtnCancel {
  @apply dark:bg-red-900 dark:hover:bg-red-800;
}
.darkBtnCreate {
  @apply dark:bg-blue-900 dark:hover:bg-blue-800;
}
</style>
<style module>
.container {
  @apply flex flex-col gap-2;
}

.containerBtns {
  @apply flex gap-2;
}

.input {
  @apply w-full rounded;
}

.button {
  @apply py-1.5 px-2 rounded;
}

.buttonCancel {
  @apply bg-red-500 text-white hover:bg-red-600 transition;
}

.buttonCreate {
  @apply bg-blue-500 text-white hover:bg-blue-600 transition;
}
</style>
