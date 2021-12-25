const apiConfig = {
  BASE_URL: "https://api.themoviedb.org/3/",
  API_KEY: "4c02f5eb2c7fd37fff7dccd444f7d1de",
  BASE_URL_GET_MOVIE: "https://www.2embed.ru/",
  originalImage: (imgPath: string | null) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath: string | null) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};

export default apiConfig;
