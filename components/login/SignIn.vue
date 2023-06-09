<template>
  <label :class="$style.label">
    <input
      v-model="email"
      :class="$style.input"
      type="email"
      placeholder="email"
    />
  </label>
  <label :class="$style.label">
    <input
      v-model="pass"
      :type="typePass"
      :class="$style.input"
      placeholder="password"
    />
    <button type="button" :class="$style.buttonEye" @click="toggleTypePass">
      <eye-icon v-if="typePass === 'password'" :class="$style.eyeIcon" />
      <eye-slash-icon v-if="typePass === 'text'" :class="$style.eyeIcon" />
    </button>
  </label>
  <button type="button" :class="$style.button" @click="signIn">
    {{ $t("signInAction") }}
  </button>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";
import { useLogin } from "~/composables/useLogin";

const { email, pass, typePass, toggleTypePass, signIn } = useLogin();
</script>

<style module>
.label {
  @apply relative select-none;
}

.buttonEye {
  @apply absolute p-[10px] top-[2px] right-0 select-none;
}

.button {
  @apply bg-blue-500 px-2.5 py-1.5 rounded text-white mt-4 select-none;
}

.eyeIcon {
  @apply h-[20px] select-none;
}

.input {
  @apply w-full rounded border border-blue-300;
}
</style>
