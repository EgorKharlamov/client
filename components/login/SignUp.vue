<template>
  <label :class="$style.label">
    <input
      v-model="email"
      type="email"
      :class="$style.input"
      placeholder="email"
    />
  </label>
  <label :class="$style.label">
    <input
      v-model="phone"
      type="text"
      :class="$style.input"
      placeholder="phone"
  /></label>
  <label :class="$style.label">
    <input
      v-model="pass"
      :type="typePass"
      :class="$style.input"
      placeholder="password"
    />

    <button
      type="button"
      :class="$style.buttonEye"
      class="relative"
      @click="toggleTypePass"
    >
      <eye-icon v-if="typePass === 'password'" :class="$style.eyeIcon" />
      <eye-slash-icon v-if="typePass === 'text'" :class="$style.eyeIcon" />
    </button>
  </label>
  <label :class="$style.label">
    <input
      v-model="passRepeat"
      :type="typePassRepeat"
      :class="$style.input"
      placeholder="repeat password"
    />
    <button
      type="button"
      :class="$style.buttonEye"
      @click="toggleTypePassRepeat"
    >
      <eye-icon v-if="typePassRepeat === 'password'" :class="$style.eyeIcon" />
      <eye-slash-icon
        v-if="typePassRepeat === 'text'"
        :class="$style.eyeIcon"
      />
    </button>
  </label>
  <label :class="$style.label">
    <input
      v-model="name"
      type="text"
      placeholder="name"
      :class="$style.input"
    />
  </label>
  <button type="button" :class="$style.button" @click="createUser">
    {{ $t("signUpAction") }}
  </button>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";
import { useLogin } from "~/composables/useLogin";

const {
  email,
  phone,
  pass,
  passRepeat,
  typePass,
  toggleTypePass,
  toggleTypePassRepeat,
  createUser,
  typePassRepeat,
  name,
} = useLogin();
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
