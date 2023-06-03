import { useRouter } from "#app";
import { useApi } from "~/composables/useApi";
import { Method } from "~/api/constants";
import { Tabs } from "~/components/login/constants";

export const useLogin = () => {
  const currentTab = ref(Tabs.SignUp);
  const secondTab = ref(Tabs.SignIn);
  const email = ref("egor@gmail.com");
  const phone = ref("79239232233");
  const pass = ref("Qwerty12");
  const passRepeat = ref("Qwerty12");
  const name = ref("Egor");
  const typePass = ref("password");
  const typePassRepeat = ref("password");

  const auth = useCookie("auth");

  const router = useRouter();

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
    await useApi(Method.POST, "/users/createUser", {
      body: {
        email: email.value,
        phone: phone.value,
        pass: pass.value,
        passRepeat: passRepeat.value,
        name: name.value,
      },
    });
  };

  const signIn = async () => {
    const data = await useApi(Method.POST, "/users/signIn", {
      body: {
        email: email.value,
        pass: pass.value,
      },
    });
    if (data.value?.access_token) {
      auth.value = data.value?.access_token;
      router.push("/");
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
