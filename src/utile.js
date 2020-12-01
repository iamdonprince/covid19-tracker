export const sortData = (sort) => {
  const sortedData = sort;
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
