import { useApi } from "#imports";
import { Method, VpnStatus } from "~/api/constants";
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

    async createVpn(data) {
      await useApi(Method.POST, vpnEndpoint.createVpns(), { body: data });
    },

    async approveVpn(name: string, status: VpnStatus) {
      await useApi(Method.PUT, vpnEndpoint.updateVpnStatusByName(name), {
        body: { status },
      });
    },
  },
});
