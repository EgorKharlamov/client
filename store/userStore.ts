import { useApi } from "#imports";
import { Method } from "~/api/constants";
import { userEndpoint } from "~/api/endpoints/userEndpoints";
import { UserEntity } from "~/api/types";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as UserEntity | null,
  }),
  getters: {
    getUser: (state) => state.user,
    getUserName: (state) => state.user?.name,
    getUserRole: (state) => state.user?.role,
  },
  actions: {
    async loadCurrentUser() {
      this.user = await useApi(Method.GET, userEndpoint.getCurrentUser());
    },
    logOut() {
      const auth = useCookie("auth");
      const router = useRouter();
      auth.value = "";
      router.push("/auth");
    },
    isItMe(id: number) {
      return this.user?.id === id;
    },
  },
});
