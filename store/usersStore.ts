import { DEFAULT_PARAMS, useApi } from "#imports";
import { Method } from "~/api/constants";
import { userEndpoint } from "~/api/endpoints/userEndpoints";
import { UserEntity } from "~/api/types";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as UserEntity[],
    count: 0,
  }),
  getters: {
    getUsers: (state) => state.users,
    getCount: (state) => state.count,
  },
  actions: {
    async loadUsers(params = DEFAULT_PARAMS) {
      const res = await useApi(Method.GET, userEndpoint.getUsers(), { params });
      console.log("res");
      this.users = res?.value?.data;
      this.count = res?.value?.count;
    },
    async deleteUserById(id: number) {
      console.log("resdel");
      await useApi(Method.DELETE, userEndpoint.deleteUserById(id));
    },
  },
});
