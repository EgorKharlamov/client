<template>
  <v-modal>
    <template #header>Create new server</template>
    <template #default>
      <div :class="$style.container">
        <label>
          <input
            v-model="name"
            :class="$style.input"
            type="text"
            placeholder="name"
          />
        </label>
        <label>
          <input
            v-model="address"
            :class="$style.input"
            type="text"
            placeholder="address"
          />
        </label>
        <label>
          <input
            v-model="maxUsers"
            :class="$style.input"
            type="number"
            placeholder="maximum users"
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
          Cancel
        </button>
        <button
          type="button"
          :class="[$style.button, $style.buttonCreate]"
          :disabled="isLoading"
          @click="createServerHandler"
        >
          Create
        </button>
      </div>
    </template>
  </v-modal>
</template>

<script setup>
import { useToast } from "vue-toastification";
import VModal from "~/components/modal/VModal.vue";
import { useServer } from "~/composables/useServer";

const toast = useToast();
const emit = defineEmits(["close"]);
const { name, address, maxUsers, createServer, isLoading } = useServer();

const createServerHandler = async () => {
  try {
    await createServer();
    emit("close");
  } catch (e) {
    toast.error(e.message);
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
  @apply bg-red-500 text-white hover:bg-red-600 transition;
}

.buttonCreate {
  @apply bg-blue-500 text-white hover:bg-blue-600 transition;
}
</style>
