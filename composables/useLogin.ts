import { useRouter } from "#app";
import { useToast } from "vue-toastification";
import { useApi } from "~/composables/useApi";
import { Method } from "~/api/constants";
import { Tabs } from "~/components/login/constants";
import { userEndpoint } from "~/api/endpoints/userEndpoints";
import { getApiError } from "~/utils/error";

export const useLogin = () => {
  const currentTab = useState("currentTab", () => Tabs.SignUp);
  const secondTab = useState("secondTab", () => Tabs.SignIn);
  const email = ref("");
  const phone = ref("");
  const pass = ref("");
  const passRepeat = ref("");
  const name = ref("");
  const typePass = ref("password");
  const typePassRepeat = ref("password");

  const auth = useCookie("auth");

  const router = useRouter();
  const toast = useToast();

  const toggleTypePass = () => {
    if (typePass.value === "password") {
      typePass.value = "text";
      return;
    }
    typePass.value = "password";
  };

  const toggleTypePassRepeat = () => {
    if (typePassRepeat.value === "password") {
      typePassRepeat.value = "text";
      return;
    }
    typePassRepeat.value = "password";
  };

  const createUser = async () => {
    try {
      await useApi(Method.POST, userEndpoint.createUser(), {
        body: {
          email: email.value,
          phone: phone.value,
          pass: pass.value,
          passRepeat: passRepeat.value,
          name: name.value,
        },
      });
      toast.success(`User created!`);
      switchTab();
    } catch (e: unknown) {
      toast.error(getApiError(e));
    }
  };

  const signIn = async () => {
    try {
      const data = await useApi(Method.POST, userEndpoint.signIn(), {
        body: {
          email: email.value,
          pass: pass.value,
        },
      });
      if (data.value?.access_token) {
        auth.value = data.value?.access_token;
        await router.push("/");
        switchTab();
      }
    } catch (e) {
      toast.error(getApiError(e));
    }
  };

  const switchTab = () => {
    if (currentTab.value === Tabs.SignUp) {
      currentTab.value = Tabs.SignIn;
      secondTab.value = Tabs.SignUp;
    } else {
      secondTab.value = Tabs.SignIn;
      currentTab.value = Tabs.SignUp;
    }
  };

  return {
    email,
    phone,
    pass,
    passRepeat,
    name,
    typePass,
    typePassRepeat,
    toggleTypePass,
    toggleTypePassRepeat,
    createUser,
    currentTab,
    secondTab,
    switchTab,
    signIn,
    auth,
  };
};
