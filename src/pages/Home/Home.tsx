import { Button, ThemeProvider } from "@mui/material";
import React from "react";
import "./Home.scss";
import { buttonTheme } from "../../common/buttotTheme";
import HeroSlide from "../../components/Hero-Slide/HeroSlide";
import MoviesList from "../../components/Movies-List/MoviesList";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const onChangePage = (url: string) => {
    history.push(url);
  };

  return (
    <React.Fragment>
      <title>Home</title>
      <HeroSlide />
      <div className="category-box container">
        <div className="section mb-3">
          <div className="header__section mb-2">
            <h2>Trending Movie</h2>
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="outlined"
                sx={{ fontWeight: 600, textTransform: "initial" }}
                onClick={() => onChangePage("/library/movies")}
              >
                View more
              </Button>
            </ThemeProvider>
          </div>
          <MoviesList category="movie" type="popular" />
        </div>

        <div className="section mb-3">
          <div className="header__section mb-2">
            <h2>Top Rated Movies</h2>
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="outlined"
                sx={{ fontWeight: 600, textTransform: "initial" }}
                onClick={() => onChangePage("/library/movies")}
              >
                View more
              </Button>
            </ThemeProvider>
          </div>
          <MoviesList category="movie" type="top_rated" />
        </div>

        <div className="section mb-3">
          <div className="header__section mb-2">
            <h2>Trending TV</h2>
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="outlined"
                sx={{ fontWeight: 600, textTransform: "initial" }}
                onClick={() => onChangePage("/library/tv-series")}
              >
                View more
              </Button>
            </ThemeProvider>
          </div>
          <MoviesList category="tv" type="popular" />
        </div>

        <div className="section mb-3">
          <div className="header__section mb-2">
            <h2>Top Rated TV</h2>
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="outlined"
                sx={{ fontWeight: 600, textTransform: "initial" }}
                onClick={() => onChangePage("/library/tv-series")}
              >
                View more
              </Button>
            </ThemeProvider>
          </div>
          <MoviesList category="tv" type="top_rated" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
