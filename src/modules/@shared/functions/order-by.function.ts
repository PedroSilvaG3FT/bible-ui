export const orderByDate = <Data extends Record<string, any>>(
  list: Data[],
  key: keyof Data,
  order: "ASC" | "DESC" = "ASC"
) => {
  return list.sort((a, b) => {
    const dateA = new Date(a[key]).getTime();
    const dateB = new Date(b[key]).getTime();

    if (order === "ASC") return dateA - dateB;
    else return dateB - dateA;
  });
};
