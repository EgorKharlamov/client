export const getApiError = (e?: any) => {
  if (e?.message) return e.message;
  return "Something wrong!";
};
