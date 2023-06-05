import { useApi } from "#imports";
import { Method, VpnStatus } from "~/api/constants";
import { VpnEntity } from "~/api/types";
import { vpnEndpoint } from "~/api/endpoints/vpnEndpoints";
import { DEFAULT_PARAMS } from "~/utils/constants";

export const useVpnsStore = defineStore("vpns", {
  state: () => ({
    vpns: [] as VpnEntity[],
    count: 0,
  }),
  getters: {
    getVpns: (state) => state.vpns,
    getCount: (state) => state.count,
  },
  actions: {
    async loadVpns(params = DEFAULT_PARAMS) {
      const res = await useApi(Method.GET, vpnEndpoint.getVpns(), { params });
      this.vpns = res?.value?.data;
      this.count = res?.value?.count;
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
