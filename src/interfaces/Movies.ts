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
}

export interface IVideoTemp {
  id: number;
  poster_path: string | null;
  title?: string;
  backdrop_path: string | null;
  name?: string;
}