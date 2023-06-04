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
    async addServer(data) {
      await useApi(Method.POST, serverEndpoint.createServer(), { body: data });
    },
    async deleteServer(params) {
      await useApi(
        Method.DELETE,
        serverEndpoint.deleteServerByName(params.name)
      );
    },
  },
});
