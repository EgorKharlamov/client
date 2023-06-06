<template>
  <v-modal>
    <template #header>Update role</template>
    <template #default>
      <div>
        <p>
          <span>Update user </span>
          <b> {{ userToUpdate.name }}</b>
          (<b> {{ userToUpdate.email }}</b
          >)
        </p>
        <label>
          <span>New Role</span>
          <select v-model="newUserRole" :class="$style.select">
            <option :value="UserRoles.Client">Client</option>
            <option :value="UserRoles.Manager">Manager</option>
          </select>
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
          :class="[$style.button, $style.buttonUpdate]"
          :disabled="isLoading"
          @click="updateUserRole"
        >
          Update
        </button>
      </div>
    </template>
  </v-modal>
</template>

<script setup lang="ts">
import VModal from "~/components/modal/VModal.vue";
import { useUsers } from "~/composables/useUsers";
import { UserRoles } from "~/api/constants";

const emit = defineEmits(["close"]);
const { updateUserRole, isLoading, userToUpdate, newUserRole } = useUsers();
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

.buttonUpdate {
  @apply bg-green-500 text-white hover:bg-green-600 transition;
}

.select {
  @apply rounded py-1 ml-2;
}
</style>
