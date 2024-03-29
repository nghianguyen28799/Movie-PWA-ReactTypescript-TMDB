import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: () => queryString.stringify({ api_key: apiConfig.API_KEY }),
});

axiosClient.interceptors.request.use(async (config) => config);

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }

//     return response;
//   },
//   (error) => {
//     throw error;
//   }
// );

export default axiosClient;
