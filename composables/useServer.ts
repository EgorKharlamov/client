import { useServersStore } from "~/store/serversStore";

export const useServer = () => {
  const name = useState("name", () => "");
  const address = useState("address", () => "");
  const maxUsers = useState("maxUsers", () => 20);
  const isLoading = useState("isLoading", () => false);

  const serverStore = useServersStore();

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
  };
};
