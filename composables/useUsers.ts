import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { debounce } from "lodash-es";
import { useUsersStore } from "~/store/usersStore";

export const useUsers = () => {
  const toast = useToast();
  const usersStore = useUsersStore();
  const { getUsers, getCount } = storeToRefs(usersStore);
  const modalApproveDeleteOpened = useState(
    "modalApproveDeleteOpened",
    () => false
  );
  const userToDeleteId = useState("userToDeleteId", () => 0);
  const isLoading = useState("isLoading", () => false);
  const currentPage = useState("currentPage", () => 1);
  const countOnPage = useState("countOnPage", () => 20);

  const lastPage = computed(() =>
    Math.ceil(getCount.value / countOnPage.value)
  );

  const pagePrev = async () => {
    currentPage.value = currentPage.value - 1;
    const params = { page: currentPage.value, count: countOnPage.value };
    await usersStore.loadUsers(params);
  };
  const pageNext = async () => {
    currentPage.value = currentPage.value + 1;
    const params = { page: currentPage.value, count: countOnPage.value };
    await usersStore.loadUsers(params);
  };
  const searchQuery = async (query: string) => {
    const params = { page: currentPage.value, count: countOnPage.value, query };
    await usersStore.loadUsers(params);
  };
  const debouncedSearchQuery = debounce(searchQuery, 500);
  const deleteUserClick = (id: number) => {
    modalApproveDeleteOpened.value = true;
    userToDeleteId.value = id;
  };
  const deleteUser = async () => {
    isLoading.value = true;
    try {
      await usersStore.deleteUserById(userToDeleteId.value);
      await loadUsers();
    } catch (e) {
      toast.error(e.message);
    }
    isLoading.value = false;
  };
  const loadUsers = async () => {
    try {
      await usersStore.loadUsers();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return {
    getUsers,
    getCount,
    modalApproveDeleteOpened,
    lastPage,
    pagePrev,
    pageNext,
    debouncedSearchQuery,
    deleteUser,
    deleteUserClick,
    loadUsers,
    currentPage,
    countOnPage,
    userToDeleteId,
  };
};
