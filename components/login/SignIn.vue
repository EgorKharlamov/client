<template>
  <label :class="$style.label">
    <input v-model="email" type="email" placeholder="email" />
  </label>
  <label :class="$style.label">
    <input v-model="pass" :type="typePass" placeholder="password" />
    <button type="button" :class="$style.buttonEye" @click="toggleTypePass">
      <eye-icon v-if="typePass === 'password'" :class="$style.eyeIcon" />
      <eye-slash-icon v-if="typePass === 'text'" :class="$style.eyeIcon" />
    </button>
  </label>
  <button type="button" :class="$style.button" @click="signIn">Войти</button>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";
import { useLogin } from "~/composables/useLogin";

const { email, pass, typePass, toggleTypePass, signIn } = useLogin();
</script>

<style module>
.label {
  @apply relative;
}

.buttonEye {
  @apply absolute p-[10px] top-[2px] right-0;
}

.button {
  @apply bg-blue-500 px-2.5 py-1.5 rounded text-white mt-4;
}

.eyeIcon {
  @apply h-[20px];
}
</style>
