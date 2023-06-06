import { DEFAULT_PARAMS, useApi } from "#imports";
import { Method, UserRoles } from "~/api/constants";
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
      this.users = res?.value?.data;
      this.count = res?.value?.count;
    },
    async deleteUserById(id: number) {
      await useApi(Method.DELETE, userEndpoint.deleteUserById(id));
    },
    async updateUserRoleById(id: number, role = UserRoles.Manager) {
      await useApi(Method.PUT, userEndpoint.updateUserRole(id), {
        body: { role },
      });
    },
  },
});
