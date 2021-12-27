import React from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import { IVideo } from "../../interfaces/Movies";
import tmdbApi from "../../api/tmdbApi";
import MovieCard from "../../components/MovieCard/MovieCard";
import { ThemeProvider } from "@mui/material/styles";
import { buttonTheme } from "../../common/buttotTheme";
import { Button, Grid, TextField } from "@mui/material";
import { skeletonData } from "../../common/skeletonData";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function useDebounce<T>(initialValue: T, time: number): [T, T, React.Dispatch<T>] {
  const [value, setValue] = React.useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = React.useState<T>(initialValue);
  React.useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);
  return [debouncedValue, value, setValue];
}

const Category = () => {
  const params: { category: string } = useParams();
  const title = params.category === "movies" ? "Movies" : "TV Series";
  const category = params.category === "movies" ? "movie" : "tv";

  const [data, setData] = React.useState<IVideo[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [debounceKeyword, keyword, setKeyword] = useDebounce<string>("", 1000);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getInitData = async () => {
    setLoading(true);
    setPage(1);
    let response = null;
    switch (category) {
      case "movie":
        response = await tmdbApi.getMoviesList({ type: "upcoming", page: 1 });
        break;
      default:
        response = await tmdbApi.getTvList({ type: "popular", page: 1 });
    }
    setData(response.data.results);
    setTotalItems(response.data.total_pages);
    setLoading(false);
    setKeyword("");
  };

  const getSearchData = async () => {
    setPage(1);
    const response = await tmdbApi.search({ category, page: 1, query: debounceKeyword });
    setData(response.data.results);
    setTotalItems(response.data.total_pages);
    setLoading(false);
  };

  React.useEffect(() => {
    getInitData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  React.useEffect(() => {
    if (debounceKeyword) {
      getSearchData();
    } else if (loading === true) {
      getInitData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceKeyword]);

  const onLoadMore = async () => {
    setPage(page + 1);
    let response = null;
    if (!keyword) {
      switch (category) {
        case "movie":
          response = await tmdbApi.getMoviesList({ type: "upcoming", page: page + 1 });
          break;
        default:
          response = await tmdbApi.getTvList({ type: "popular", page: page + 1 });
      }
    } else {
      response = await tmdbApi.search({ category, page: page + 1, query: keyword });
    }
    setData([...data, ...response.data.results]);
  };

  const handleOnChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (loading === false) setLoading(true);
    setKeyword(event.target.value);
  };

  return (
    <div className="container category">
      <div className="category__header">
        <Grid container>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <h2>{title}</h2>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
          >
            <TextField
              color="primary"
              size="small"
              name="search"
              value={keyword}
              onChange={handleOnChangeSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </div>
      {data.length || !keyword || loading ? (
        <React.Fragment>
          <div className="category__movies-list">
            {!loading
              ? data.map((item, index) => (
                  <div className="movie-cart-box" key={index}>
                    <MovieCard item={item} category={category} />
                  </div>
                ))
              : null}
            {loading
              ? skeletonData.map((item, index) => (
                  <div className="movie-cart-box" key={index}>
                    <MovieCard item={item} category={category} loading={true} />
                  </div>
                ))
              : null}
          </div>
          <div className="category__load-more">
            {!loading ? (
              <ThemeProvider theme={buttonTheme}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ fontWeight: 600, textTransform: "initial" }}
                  onClick={onLoadMore}
                >
                  Load more
                </Button>
              </ThemeProvider>
            ) : null}
          </div>
        </React.Fragment>
      ) : (
        <div className="not-found">
          <p>Not videos found.</p>
        </div>
      )}
    </div>
  );
};

export default Category;
