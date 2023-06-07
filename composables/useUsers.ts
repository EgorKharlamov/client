import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { debounce } from "lodash-es";
import { useUsersStore } from "~/store/usersStore";
import { UserRoles } from "~/api/constants";

export const useUsers = () => {
  const toast = useToast();
  const usersStore = useUsersStore();
  const { getUsers, getCount } = storeToRefs(usersStore);
  const modalApproveDeleteOpened = useState(
    "modalApproveDeleteOpened",
    () => false
  );
  const modalUpdateUserRoleOpened = useState(
    "modalUpdateUserRoleOpened",
    () => false
  );
  const userToDelete = useState("userToDelete", () => {});
  const userToUpdate = useState("userToUpdate", () => {});
  const isLoading = useState("isLoading", () => false);
  const currentPage = useState("currentPage", () => 1);
  const countOnPage = useState("countOnPage", () => 20);

  const newUserRole = useState("newUserRole", () => UserRoles.Client);

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
  const deleteUserClick = (user: {}) => {
    modalApproveDeleteOpened.value = true;
    userToDelete.value = user;
  };
  const deleteUser = async () => {
    isLoading.value = true;
    try {
      await usersStore.deleteUserById(userToDelete.value.id);
      await loadUsers();
    } catch (e) {
      toast.error(getApiError(e));
    }
    isLoading.value = false;
  };
  const loadUsers = async () => {
    try {
      await usersStore.loadUsers();
    } catch (e) {
      toast.error(getApiError(e));
    }
  };

  const updateUserRoleClick = (user: {}) => {
    modalUpdateUserRoleOpened.value = true;
    userToUpdate.value = user;
  };

  const updateUserRole = async () => {
    try {
      await usersStore.updateUserRoleById(
        userToUpdate.value.id,
        newUserRole.value
      );
      toast.success(
        `Role for user "${userToUpdate.value.name} (${userToUpdate.value.email})" updated!`
      );
      modalUpdateUserRoleOpened.value = false;
      userToUpdate.value = {};
      await loadUsers();
    } catch (e) {
      toast.error(getApiError(e));
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
    userToDelete,
    userToUpdate,
    newUserRole,
    updateUserRole,
    updateUserRoleClick,
    modalUpdateUserRoleOpened,
  };
};
