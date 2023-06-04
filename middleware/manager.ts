import { useUserStore } from "~/store/userStore";
import { UserRoles } from "~/api/constants";

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore();
  if (!userStore.user) {
    await userStore.loadCurrentUser();
  }
  if (userStore.getUserRole === UserRoles.Manager) {
    return navigateTo("/");
  }
});
