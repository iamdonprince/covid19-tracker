import numeral from "numeral";

export const sortData = (sort) => {
  const sortedData = sort;
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// return info box number formated

export const numFormated = (stat) => {
  return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
};
