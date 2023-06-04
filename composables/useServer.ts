import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useServersStore } from "~/store/serversStore";

export const useServer = () => {
  const serverStore = useServersStore();
  const modalOpened = ref(false);
  const modalDeleteConfirmOpened = ref(false);
  const serverDeleteName = ref("");
  const name = useState("name", () => "");
  const address = useState("address", () => "");
  const maxUsers = useState("maxUsers", () => 20);
  const isLoading = useState("isLoading", () => false);

  const onDeleteClickHandler = (name: string) => {
    modalDeleteConfirmOpened.value = true;
    serverDeleteName.value = name;
  };
  const { getServers } = storeToRefs(serverStore);
  const toast = useToast();

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
  };
};
