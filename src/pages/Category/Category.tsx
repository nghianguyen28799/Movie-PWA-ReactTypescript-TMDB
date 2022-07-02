import React from "react";
import "./Category.scss";
import { useHistory, useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import MovieCard from "../../components/MovieCard/MovieCard";
import { ThemeProvider } from "@mui/material/styles";
import { buttonTheme } from "../../common/buttotTheme";
import { Box, Button, Grid, TextField } from "@mui/material";
import { skeletonData } from "../../common/skeletonData";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateData } from "../../redux/modules/moviesSlice";

function useDebounce<T>(initialValue: T, time: number): [T, T, React.Dispatch<T>] {
  const [value, setValue] = React.useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    const debounce = setTimeout(
      () => {
        setDebouncedValue(value);
      },
      value ? time : 0
    );
    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);
  return [debouncedValue, value, setValue];
}

const Category = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const buttonRef = React.useRef<any>(null);

  const params: { category: string } = useParams();
  const title = params.category === "movies" ? "Movies" : "TV Series";
  const category = params.category === "movies" ? "movie" : "tv";

  const data = useSelector((state: RootState) => state.movies?.[category]?.data) ?? [];
  const page = useSelector((state: RootState) => state.movies?.[category]?.page) ?? 1;
  const keySearch = useSelector((state: RootState) => state.movies?.[category]?.keySearch) ?? "";

  const [debounceKeyword, keyword, setKeyword] = useDebounce<string>("", 500);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [allowReRender, setAllowReRender] = React.useState<boolean>(false);

  const fetchKeySearch = React.useCallback(() => {
    setKeyword(keySearch);
    setAllowReRender(true);

    let prevLocation: any;

    history.listen((nextLocation) => {
      prevLocation = nextLocation;
    });

    if (prevLocation?.pathName?.includes("/playvideo") && page > 1) {
      buttonRef?.current?.scrollIntoView();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  React.useEffect(() => {
    fetchKeySearch();
  }, [fetchKeySearch]);

  const getInitData = React.useCallback(async () => {
    if (data?.length === 0) {
      if (params.category !== "movies" && params.category !== "tv-series") {
        history.push("/not-found");
      }

      setLoading(true);
      let response = null;
      switch (category) {
        case "movie":
          response = await tmdbApi.getMoviesList({ type: "upcoming", page: 1 });
          break;
        default:
          response = await tmdbApi.getTvList({ type: "popular", page: 1 });
      }
      // setData(response.data.results);
      dispatch(
        updateData({
          type: category,
          data: {
            keySearch: "",
            page: 1,
            data: response.data.results,
          },
        })
      );
      setTotalItems(response.data.total_pages);
      setLoading(false);
      // setKeyword("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const getSearchData = async () => {
    // setPage(1);
    const response = await tmdbApi.search({ category, page: 1, query: debounceKeyword });
    // setData(response.data.results);
    dispatch(
      updateData({
        type: category,
        data: {
          keySearch: debounceKeyword,
          page: 1,
          data: response.data.results,
        },
      })
    );
    setTotalItems(response.data.total_pages);
    setLoading(false);
  };

  React.useEffect(() => {
    getInitData();
  }, [getInitData]);

  React.useEffect(() => {
    if (allowReRender) {
      if (debounceKeyword) {
        getSearchData();
      } else if (loading === true) {
        getInitData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceKeyword]);

  const onLoadMore = async () => {
    // setPage(page + 1);
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
    dispatch(
      updateData({
        type: category,
        data: {
          keySearch: debounceKeyword,
          page: page + 1,
          data: [...data, ...response.data.results],
        },
      })
    );
  };

  const handleOnChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (loading === false) setLoading(true);
    setKeyword(event.target.value);
  };

  return (
    <React.Fragment>
      <title>{title}</title>

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
              <Box component="form" autoComplete="off">
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
              </Box>
            </Grid>
          </Grid>
        </div>
        {data?.length || !keyword || loading ? (
          <React.Fragment>
            <div className="category__movies-list">
              {!loading
                ? data?.map((item, index) => (
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
              {!loading && totalItems !== page ? (
                <ThemeProvider theme={buttonTheme}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ fontWeight: 600, textTransform: "initial" }}
                    onClick={onLoadMore}
                    ref={buttonRef}
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
    </React.Fragment>
  );
};

export default Category;
