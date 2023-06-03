export default defineNuxtRouteMiddleware((to) => {
  const auth = useCookie("auth");
  if (!auth.value && to.path !== "/auth") {
    return navigateTo("/auth");
  } else if (auth.value && to.path === "/auth") {
    return navigateTo("/");
  }
});
