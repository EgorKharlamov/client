import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { debounce } from "lodash-es";
import { useVpnsStore } from "~/store/vpnsStore";
import { useServersStore } from "~/store/serversStore";
import { VpnStatus } from "~/api/constants";

export const useVpn = () => {
  const toast = useToast();
  const vpnStore = useVpnsStore();
  const { getVpns, getCount } = storeToRefs(vpnStore);
  const serverStore = useServersStore();
  const { getServers } = storeToRefs(serverStore);
  const serverAddr = useState("serverAddr", () => "");
  const forUserEmail = useState("forUserEmail", () => "");
  const count = useState("count", () => 1);
  const prefix = useState("prefix", () => "");
  const modalCreateOpened = useState("modalCreateOpened", () => false);
  const modalApproveOpened = useState("modalApproveOpened", () => false);
  const modalApproveName = useState("modalApproveName", () => "");
  const isLoading = useState("isLoading", () => false);
  const currentPage = useState("currentPage", () => 1);
  const countOnPage = useState("countOnPage", () => 20);

  const lastPage = computed(() =>
    Math.ceil(getCount.value / countOnPage.value)
  );

  const pagePrev = async () => {
    currentPage.value = currentPage.value - 1;
    const params = { page: currentPage.value, count: countOnPage.value };
    await vpnStore.loadVpns(params);
  };
  const pageNext = async () => {
    currentPage.value = currentPage.value + 1;
    const params = { page: currentPage.value, count: countOnPage.value };
    await vpnStore.loadVpns(params);
  };
  const searchQuery = async (query: string) => {
    const params = { page: currentPage.value, count: countOnPage.value, query };
    await vpnStore.loadVpns(params);
  };
  const debouncedSearchQuery = debounce(searchQuery, 500);
  const approveVpnClick = (name: string) => {
    modalApproveName.value = name;
    modalApproveOpened.value = true;
  };

  const createVpn = async () => {
    try {
      await serverStore.loadServers();
      const availableServer = getServers.value.find(
        (server) => server.availableSlots
      );
      const serverAddr = availableServer?.addr;
      const data = {
        serverAddr,
        forUserEmail: forUserEmail.value,
        count: count.value,
        prefix: prefix.value,
      };
      await vpnStore.createVpn(data);
      await vpnStore.loadVpns();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const approveVpn = async (name: string) => {
    try {
      await vpnStore.approveVpn(name, VpnStatus.Approved);
      await vpnStore.loadVpns();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const loadVpns = async () => {
    try {
      await vpnStore.loadVpns();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return {
    serverAddr,
    forUserEmail,
    count,
    prefix,
    loadVpns,
    getVpns,
    modalApproveOpened,
    modalCreateOpened,
    approveVpnClick,
    approveVpn,
    isLoading,
    createVpn,
    modalApproveName,
    currentPage,
    lastPage,
    pagePrev,
    pageNext,
    debouncedSearchQuery,
  };
};
