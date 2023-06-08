<template>
  <v-modal>
    <template #header>{{ tp("header") }}</template>
    <template #default>
      <div :class="$style.container">
        <label>
          <input
            v-model="name"
            :class="$style.input"
            type="text"
            :placeholder="tp('placeholderName')"
          />
        </label>
        <label>
          <input
            v-model="address"
            :class="$style.input"
            type="text"
            :placeholder="tp('placeholderAddress')"
          />
        </label>
        <label>
          <input
            v-model="maxUsers"
            :class="$style.input"
            type="number"
            :placeholder="tp('placeholderMaxUsers')"
          />
        </label>
      </div>
    </template>
    <template #footer>
      <div :class="$style.containerBtns">
        <button
          type="button"
          :class="[$style.button, $style.buttonCancel]"
          @click="emit('close')"
        >
          {{ tp("buttonCancel") }}
        </button>
        <button
          type="button"
          :class="[$style.button, $style.buttonCreate]"
          :disabled="isLoading"
          @click="createServerHandler"
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
import { useServer } from "~/composables/useServer";

const emit = defineEmits(["close"]);
const { t } = useI18n();
const tp = (field: string) => capitalize(t(`servers.modal.add.${field}`));
const { name, address, maxUsers, createServer, isLoading } = useServer();

const createServerHandler = async () => {
  await createServer();
  emit("close");
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
