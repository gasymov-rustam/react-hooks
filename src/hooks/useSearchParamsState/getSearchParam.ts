export const getSearchParam = (search: string, param: string) => {
  const searchParams = new URLSearchParams(search);

  return searchParams.get(param);
};
