export const getApiError = (e?: Error) => {
  if (e?.message) return e.message;
  return "Something wrong!";
};
