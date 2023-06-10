<template>
  <v-modal>
    <template #header>
      <h3>{{ tp("header") }}</h3>
    </template>
    <template #default>
      <div>
        <p>
          <span>{{ tp("deleteUser") }}&nbsp;</span>
          <b> {{ userToDelete.name }}</b>
          (<b> {{ userToDelete.email }}</b
          >)
        </p>
        <p>{{ tp("areYouSure") }}</p>
      </div>
    </template>
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
          @click="deleteUserHandler"
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
import { useUsers } from "~/composables/useUsers";

const toast = useToast();
const { t } = useI18n();
const tp = (prefix: string) => capitalize(t(`users.modal.delete.${prefix}`));
const emit = defineEmits(["close"]);
const { deleteUser, isLoading, userToDelete } = useUsers();
const deleteUserHandler = async () => {
  try {
    await deleteUser();
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
