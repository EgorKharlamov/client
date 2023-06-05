import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { debounce } from "lodash-es";
import { useServersStore } from "~/store/serversStore";

export const useServer = () => {
  const serverStore = useServersStore();
  const { getServers, getCount } = storeToRefs(serverStore);
  const modalOpened = ref(false);
  const modalDeleteConfirmOpened = ref(false);
  const serverDeleteName = ref("");
  const name = useState("name", () => "");
  const address = useState("address", () => "");
  const maxUsers = useState("maxUsers", () => 20);
  const isLoading = useState("isLoading", () => false);
  const currentPage = useState("currentPage", () => 1);
  const countOnPage = useState("countOnPage", () => 20);

  const onDeleteClickHandler = (name: string) => {
    modalDeleteConfirmOpened.value = true;
    serverDeleteName.value = name;
  };
  const toast = useToast();
  const lastPage = computed(() =>
    Math.ceil(getCount.value / countOnPage.value)
  );

  const pagePrev = async () => {
    currentPage.value = currentPage.value - 1;
    const params = { page: currentPage.value, count: countOnPage.value };
    await serverStore.loadServers(params);
  };
  const pageNext = async () => {
    currentPage.value = currentPage.value + 1;
    const params = { page: currentPage.value, count: countOnPage.value };
    await serverStore.loadServers(params);
  };
  const searchQuery = async (query: string) => {
    const params = { page: currentPage.value, count: countOnPage.value, query };
    await serverStore.loadServers(params);
  };
  const debouncedSearchQuery = debounce(searchQuery, 500);

  const loadServers = async () => {
    try {
      await serverStore.loadServers();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const createServer = async () => {
    isLoading.value = true;
    const data = {
      name: name.value,
      addr: address.value,
      maxUsers: maxUsers.value,
    };
    await serverStore.addServer(data);
    await serverStore.loadServers();
    isLoading.value = false;
  };

  const deleteServer = async (name: string) => {
    isLoading.value = true;
    const params = {
      name,
    };
    await serverStore.deleteServer(params);
    await serverStore.loadServers();
    isLoading.value = false;
  };

  return {
    name,
    address,
    maxUsers,
    createServer,
    deleteServer,
    isLoading,
    loadServers,
    getServers,
    modalOpened,
    modalDeleteConfirmOpened,
    onDeleteClickHandler,
    serverDeleteName,
    currentPage,
    lastPage,
    pagePrev,
    pageNext,
    debouncedSearchQuery,
  };
};
