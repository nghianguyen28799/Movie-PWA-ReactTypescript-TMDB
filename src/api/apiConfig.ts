const apiConfig = {
  originalImage: (imgPath: string | null) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath: string | null) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};

export default apiConfig;
