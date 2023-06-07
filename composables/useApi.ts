import { useFetch } from "#app";
import { Method } from "~/api/constants";

export const useApi = async (
  method: Method,
  path: string,
  options?: Record<string, any>
) => {
  const router = useRouter();
  const auth = useCookie("auth");
  const config = useRuntimeConfig();
  const opt = {};
  if (options?.body) opt.body = options.body;
  if (options?.params) opt.params = options.params;
  if (auth.value) opt.headers = { Authorization: `Bearer ${auth.value}` };
  // useFetch(path, { method });
  const { data, error } = await useFetch(path, {
    method,
    baseURL: config.public.baseURL,
    ...opt,
  });
  if (error?.value?.statusCode === 401) {
    auth.value = "";
    router.push("/auth");
    return;
  }
  if (error?.value) {
    throw error?.value?.data.error;
  }
  return data;
};
