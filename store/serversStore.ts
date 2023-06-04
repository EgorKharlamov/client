import { useApi } from "#imports";
import { Method } from "~/api/constants";
import { ServerEntity } from "~/api/types";
import { serverEndpoint } from "~/api/endpoints/serverEndpoints";

export const useServersStore = defineStore("servers", {
  state: () => ({
    servers: [] as ServerEntity[],
  }),
  getters: {
    getServers: (state) => state.servers,
  },
  actions: {
    async loadServers() {
      this.servers = await useApi(Method.GET, serverEndpoint.getServers());
    },
  },
});
