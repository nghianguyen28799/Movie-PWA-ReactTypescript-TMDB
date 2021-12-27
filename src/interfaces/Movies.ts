export interface IPopularMovie {
  page: number;
  results: IPopularMovieResults[];
  total_results: number;
  total_pages: number;
}

export interface IPopularMovieResults {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_data: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface IVideo {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_data: string;
  genre_ids: any;
  original_title: string;
  id: number;
  release_date: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  first_air_date: string;
  name: string;
  origin_country: [string];
  original_name: string;
  vote_average: number;
  genres: IGenres[];
  runtime: number | string;
  production_countries: any;
  episode_run_time: any;
  last_episode_to_air: IEpisode;
  number_of_seasons: number;
  seasons: ISeason[];
}

export interface IVideoTemp {
  id: number;
  poster_path: string | null;
  title?: string;
  backdrop_path: string | null;
  name?: string;
}

interface IGenres {
  id: number;
  name: string;
}

interface IEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
