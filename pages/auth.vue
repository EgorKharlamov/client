<template>
  <div
    class="flex flex-col items-center align-middle justify-center h-[100vh] bg-gray-100"
  >
    <div
      class="w-full sm:max-w-[500px] rounded border-gray-400 bg-gray-50 sm:border-2"
    >
      <form
        class="flex flex-col gap-1 justify-center align-middle items-center p-5"
      >
        <div
          class="relative w-full items-center justify-center text-center flex flex-col-reverse"
        >
          <h1 class="p-3 capitalize text-3xl select-none text-gray-800">
            {{ $t(currentTab) }}
          </h1>
          <button
            type="button"
            class="p-2 sm:absolute -right-2 top-5 bg-blue-300 hover:bg-blue-400 rounded text-white py-0.5 px-1 select-none"
            @click="switchTab"
          >
            {{ $t(secondTab) }}
          </button>
        </div>
        <transition name="fade">
          <sign-up v-if="currentTab === Tabs.SignUp" />
        </transition>
        <transition name="fade">
          <sign-in v-if="currentTab === Tabs.SignIn" />
        </transition>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from "~/composables/useLogin";
import SignUp from "~/components/login/SignUp.vue";
import { Tabs } from "~/components/login/constants";
import SignIn from "~/components/login/SignIn.vue";

definePageMeta({
  middleware: "auth",
});

const { currentTab, secondTab, switchTab } = useLogin();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
