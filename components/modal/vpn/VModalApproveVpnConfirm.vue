<template>
  <v-modal>
    <template #header>{{ tp("header") }}</template>
    <template #default>{{ tp("body") }}</template>
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
          @click="approveVpnHandler"
        >
          {{ tp("buttonApprove") }}
        </button>
      </div>
    </template>
  </v-modal>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { capitalize } from "lodash-es";
import VModal from "~/components/modal/VModal.vue";
import { useVpn } from "~/composables/useVpn";

const toast = useToast();
const { t } = useI18n();
const tp = (field: string) => capitalize(t(`vpns.modal.approve.${field}`));
const emit = defineEmits(["close"]);
const props = defineProps<{ name: string }>();
const { approveVpn, isLoading } = useVpn();
const approveVpnHandler = async () => {
  try {
    await approveVpn(props.name);
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
