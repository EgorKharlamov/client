import { useRouter } from "#app";
import { useToast } from "vue-toastification";
import dayjs from "dayjs";
import { useApi } from "~/composables/useApi";
import { Method } from "~/api/constants";
import { Tabs } from "~/components/login/constants";
import { userEndpoint } from "~/api/endpoints/userEndpoints";
import { getApiError } from "~/utils/error";

export const useLogin = () => {
  const config = useRuntimeConfig();
  const { isDev } = config.public;

  const currentTab = useState("currentTab", () => Tabs.SignUp);
  const secondTab = useState("secondTab", () => Tabs.SignIn);

  const email = ref(isDev ? DEV_LOGIN.email : "");
  const phone = ref(isDev ? DEV_LOGIN.phone : "");
  const pass = ref(isDev ? DEV_LOGIN.pass : "");
  const passRepeat = ref(isDev ? DEV_LOGIN.passRepeat : "");
  const name = ref(isDev ? DEV_LOGIN.name : "");

  const typePass = ref("password");
  const typePassRepeat = ref("password");

  const getCookieParams = () => {
    const cookieParams = {
      maxAge: 60 * 60 * 24 * 7,
      expires: dayjs().add(7, "d").toDate(),
    };
    const cookieProdParams = {
      sameSite: "strict",
      secure: true,
      httpOnly: false,
    };
    if (isDev) {
      return cookieParams;
    } else {
      return {
        ...cookieParams,
        ...cookieProdParams,
      };
    }
  };
  const auth = useCookie("auth", getCookieParams());

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
