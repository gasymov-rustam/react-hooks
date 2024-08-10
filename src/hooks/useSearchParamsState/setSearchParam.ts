export const setSearchParam = (search: string, param: string, value: string) => {
  const searchParams = new URLSearchParams(search);
  searchParams.set(param, value);

  return searchParams.toString();
};
