<template>
  <v-modal>
    <template #header>Create new vpn</template>
    <template #default>
      <div :class="$style.container">
        <label>
          <input
            v-model="forUserEmail"
            :class="$style.input"
            type="email"
            placeholder="email"
          />
        </label>
        <label>
          <input
            v-model="count"
            :class="$style.input"
            type="number"
            placeholder="count"
          />
        </label>
        <label>
          <input
            v-model="prefix"
            :class="$style.input"
            type="text"
            placeholder="prefix"
          />
        </label>
      </div>
    </template>
    <template #footer>
      <div :class="$style.containerBtns">
        <button
          type="button"
          :class="[$style.button, $style.buttonCancel]"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          type="button"
          :class="[$style.button, $style.buttonCreate]"
          :disabled="isLoading"
          @click="createVpnHandler"
        >
          Create
        </button>
      </div>
    </template>
  </v-modal>
</template>
<script setup>
import VModal from "~/components/modal/VModal.vue";
import { useVpn } from "~/composables/useVpn";

const emit = defineEmits(["close"]);
const { forUserEmail, count, prefix, isLoading, createVpn } = useVpn();
const closeModal = () => emit("close");
const createVpnHandler = async () => {
  await createVpn();
  closeModal();
};
</script>
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
