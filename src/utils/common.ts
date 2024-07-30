export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getNameImageFromUrl = (url: string) => {
  const fileName = url.split('/').slice(-1)[0];
  return fileName;
};

export const getStarScore = (rate: number) => {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate);
};
