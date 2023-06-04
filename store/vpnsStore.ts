import { useApi } from "#imports";
import { Method } from "~/api/constants";
import { VpnEntity } from "~/api/types";
import { vpnEndpoint } from "~/api/endpoints/vpnEndpoints";

export const useVpnsStore = defineStore("vpns", {
  state: () => ({
    vpns: [] as VpnEntity[],
  }),
  getters: {
    getVpns: (state) => state.vpns,
  },
  actions: {
    async loadVpns() {
      this.vpns = await useApi(Method.GET, vpnEndpoint.getVpns());
    },
  },
});
