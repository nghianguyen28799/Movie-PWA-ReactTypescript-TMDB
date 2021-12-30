export interface IMovieRequest {
    type: "upcoming" | "popular" | "top_rated" | string;
    page: number;
  }
  
  export interface ITvRequest {
    type: "popular" | "top_rated" | "on_the_air" | string;
    page: number;
  }
  
  export interface ICategoryRequest {
      category: "movie" | "tv" | string;
      id?: number | string;
      page?: number;
      query?: string;
  }

  export interface IDetailEpisode {
    tv_id: number;
    season_number: number;
    episode_number: number;
  }

  export interface IMutiSearch {
    page: number;
    query: string;
  }