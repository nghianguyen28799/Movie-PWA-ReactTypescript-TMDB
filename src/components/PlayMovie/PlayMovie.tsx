import { Grid, MenuItem, Select, SelectChangeEvent, useMediaQuery } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import { IVideo } from "../../interfaces/Movies";
import CreditsList from "../CreditsList/CreditsList";
import MoviesList from "../Movies-List/MoviesList";
import "./PlayMovie.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PlayMovie = () => {
  const mobileScreen = useMediaQuery("(min-width:600px)");
  const params: { category: string; id: string } = useParams();
  const { category, id } = params;
  const iframeSrc = `https://www.2embed.ru/embed/tmdb/${category}?id=${id}`;

  const [item, setItem] = React.useState<IVideo>();
  // const [seasonData, setSeasonData] = React.useState<[string]>();
  // const [episodeData, setEpisodeData] = React.useState<[string]>();
  const [season, setSeason] = React.useState<string>("1");
  const [episode, setEpisode] = React.useState<string>("1");

  React.useEffect(() => {
    const getDetail = async () => {
      const response: any = await tmdbApi.detail({ category, id });
      setItem(response.data);
    };
    getDetail();
  }, [category, id]);

  const handleChangeSeason = (event: SelectChangeEvent) => {
    setSeason(event.target.value);
  };

  const handleChangeEpisode = (event: SelectChangeEvent) => {
    setEpisode(event.target.value);
  };

  console.log(item);

  return (
    <div>
      {item && (
        <React.Fragment>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.poster_path ?? item.backdrop_path
              )})`,
            }}
          ></div>

          {!mobileScreen ? (
            <React.Fragment>
              <div className="container video-box mb-3">
                <iframe
                  src={iframeSrc}
                  allowFullScreen={true}
                  width="100%"
                  height="100%"
                  title="trailer"
                ></iframe>
              </div>
              {category === "tv" ? (
                <div className="container selector mb-3">
                  <Grid container>
                    <Grid item xs={3}>
                      <Select value={season} onChange={handleChangeSeason} fullWidth size="small">
                        {item.seasons.map((season) =>
                          season.season_number > 0 && season.air_date ? (
                            <MenuItem value={season.season_number.toString()}>
                              {season.name}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                    </Grid>
                    <Grid item xs={9}>
                      <Select
                        value={episode}
                        MenuProps={MenuProps}
                        onChange={handleChangeEpisode}
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </div>
              ) : null}
            </React.Fragment>
          ) : null}

          <div className="container detail mb-3">
            <div className="movie-poster">
              <div
                className="movie-poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.w500Image(
                    item.poster_path ?? item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-info">
              <div className="movie-info__title">
                <h1>{item.title ?? item.name}</h1>
              </div>
              <div className="movie-info__genres">
                {item?.genres.map((item) => (
                  <div className="genres-box" key={item.id}>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="movie-info__description">
                <p>{item.overview}</p>
              </div>
              <div className="movie-info__duration">
                <h2>Duration</h2>
                <span style={{ color: "#9e9e9e" }}>
                  {category === "movie" ? item.runtime : item?.episode_run_time[0]}m
                </span>
              </div>
              <div className="movie-info__core">
                <h2>User Core</h2>
                <span style={{ color: "#9e9e9e" }}>{item.vote_average} / 10</span>
              </div>
              <div className="movie-info__casts">
                <h2>Casts</h2>
                <CreditsList id={id} category={category} />
              </div>
              <div className="movie-info__country">
                <h2>Country</h2>
                <span style={{ color: "#9e9e9e" }}>{item.production_countries[0].name}</span>
              </div>
            </div>
          </div>

          {mobileScreen ? (
            <React.Fragment>
              <div className="container video-box mb-3">
                <iframe
                  src={iframeSrc}
                  allowFullScreen={true}
                  width="100%"
                  height="100%"
                  title="trailer"
                ></iframe>
              </div>
              {category === "tv" ? (
                <div className="container selector mb-3">
                  <Grid container>
                    <Grid item xs={3}>
                      <Select value={season} onChange={handleChangeSeason} fullWidth size="small">
                        {item.seasons.map((season) =>
                          season.season_number > 0 && season.air_date ? (
                            <MenuItem value={season.season_number.toString()}>
                              {season.name}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                    </Grid>
                    <Grid item xs={9}>
                      <Select
                        value={episode}
                        MenuProps={MenuProps}
                        onChange={handleChangeEpisode}
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </div>
              ) : null}
            </React.Fragment>
          ) : null}

          <div className="container similar mb-3">
            <h2 className="mb-3">Similar</h2>
            <MoviesList category={category} id={Number(id)} type="similar" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PlayMovie;
