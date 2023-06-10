<template>
  <v-modal>
    <template #header>{{ tp("header") }}</template>
    <template #default>{{ tp("body") }}</template>
    <template #footer>
      <div :class="$style.containerBtns">
        <button
          type="button"
          :class="[$style.button, $style.buttonCancel]"
          class="darkButtonCancel"
          @click="emit('close')"
        >
          {{ tp("buttonCancel") }}
        </button>
        <button
          type="button"
          :class="[$style.button, $style.buttonDelete]"
          class="buttonDeleteDark"
          :disabled="isLoading"
          @click="deleteServerHandler"
        >
          {{ tp("buttonDelete") }}
        </button>
      </div>
    </template>
  </v-modal>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { capitalize } from "lodash-es";
import VModal from "~/components/modal/VModal.vue";
import { useServer } from "~/composables/useServer";

const toast = useToast();
const emit = defineEmits(["close"]);
const props = defineProps<{ name: string }>();
const { deleteServer, isLoading } = useServer();

const { t } = useI18n();
const tp = (field: string) => capitalize(t(`servers.modal.delete.${field}`));

const deleteServerHandler = async () => {
  try {
    await deleteServer(props.name);
    emit("close");
  } catch (e) {
    toast.error(getApiError(e));
  }
};
</script>

<style scoped>
.buttonDeleteDark {
  @apply dark:bg-red-900 dark:hover:bg-red-800;
}
.darkButtonCancel {
  @apply dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-none;
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
  @apply border border-gray-500 transition;
}

.buttonDelete {
  @apply bg-red-500 text-white hover:bg-red-600 transition;
}
</style>
