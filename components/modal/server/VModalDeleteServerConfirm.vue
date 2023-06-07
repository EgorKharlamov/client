<template>
  <v-modal>
    <template #header>Delete server</template>
    <template #default>Are you sure?</template>
    <template #footer>
      <div :class="$style.containerBtns">
        <button
          type="button"
          :class="[$style.button, $style.buttonCancel]"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          type="button"
          :class="[$style.button, $style.buttonCreate]"
          :disabled="isLoading"
          @click="deleteServerHandler"
        >
          Delete
        </button>
      </div>
    </template>
  </v-modal>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import VModal from "~/components/modal/VModal.vue";
import { useServer } from "~/composables/useServer";

const toast = useToast();
const emit = defineEmits(["close"]);
const props = defineProps<{ name: string }>();
const { deleteServer, isLoading } = useServer();
const deleteServerHandler = async () => {
  try {
    await deleteServer(props.name);
    emit("close");
  } catch (e) {
    toast.error(getApiError(e));
  }
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
  @apply border border-gray-500 transition;
}

.buttonCreate {
  @apply bg-red-500 text-white hover:bg-red-600 transition;
}
</style>
