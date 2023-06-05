import { useApi } from "#imports";
import { Method } from "~/api/constants";
import { ServerEntity } from "~/api/types";
import { serverEndpoint } from "~/api/endpoints/serverEndpoints";
import { DEFAULT_PARAMS } from "~/utils/constants";

export const useServersStore = defineStore("servers", {
  state: () => ({
    servers: [] as ServerEntity[],
    count: 0,
  }),
  getters: {
    getServers: (state) => state.servers,
    getCount: (state) => state.count,
  },
  actions: {
    async loadServers(params = DEFAULT_PARAMS) {
      const res = await useApi(Method.GET, serverEndpoint.getServers(), {
        params,
      });
      this.servers = res?.value?.data;
      this.count = res?.value?.count;
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
