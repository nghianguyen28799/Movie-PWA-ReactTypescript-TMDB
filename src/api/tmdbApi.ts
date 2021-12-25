import { ICategoryRequest, IMovieRequest, ITvRequest } from "../interfaces/tmdbInterface";
import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";

const tmdbApi = {
  getMoviesList: (request: IMovieRequest) => {
    const url = "movie/" + request.type + "?api_key=" + apiConfig.API_KEY + "&language=en-US&page=" + request.page;
    return axiosClient.get(url);
  },

  getTvList: (request: ITvRequest) => {
    const url = "tv/" + request.type + "?api_key=" + apiConfig.API_KEY + "&language=en-US&page=" + request.page;
    return axiosClient.get(url);
  },

  getVideos: (request: ICategoryRequest) => {
    try {
      const url = request.category + "/" + request?.id + "/videos?api_key=" + apiConfig.API_KEY + "&language=en-US";
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },

  search: (request: ICategoryRequest) => {
    const url = "search/" + request.category;
    return axiosClient.get(url);
  },

  credits: (request: ICategoryRequest) => {
    try {
      const url = request.category + "/" + request.id + "/credits";
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },

  similar: (request: ICategoryRequest) => {
    try {
      const url = request.category + "/" + request.id + "/similar?api_key=" + apiConfig.API_KEY + "&language=en-US&page=" + request.page;
      return axiosClient.get(url);
    } catch (error) {
      console.log(error);
    }
  },
};

export default tmdbApi;
