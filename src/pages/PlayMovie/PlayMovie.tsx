import {
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Box,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import { buttonTheme } from "../../common/buttotTheme";
import { IVideo } from "../../interfaces/Movies";
import CreditsList from "../../components/CreditsList/CreditsList";
import ModalTrailer from "../../components/Modal/Modal";
import MoviesList from "../../components/Movies-List/MoviesList";
import "./PlayMovie.scss";
import CloseIcon from "@mui/icons-material/Close";
import { scrollToTop } from "../../common/ScrollToTop";

interface IEpisode {
  id: number;
  episode_number: number;
  name: string;
}

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
  const params: { category: string; id: string } = useParams();
  const { category, id } = params;

  const [loading, setLoading] = React.useState<boolean>(true);
  const [item, setItem] = React.useState<IVideo>();
  const [episodeData, setEpisodeData] = React.useState<IEpisode[]>([
    {
      id: 1,
      episode_number: 1,
      name: "",
    },
  ]);
  const [season, setSeason] = React.useState<string>("1");
  const [episode, setEpisode] = React.useState<string>("1");
  const [trailers, setTrailers] = React.useState<any>();
  const [openTrailer, setOpenTrailer] = React.useState<boolean>(false);
  const iframeRef = React.useRef<any>(null);

  const iframeSrc = `https://www.2embed.ru/embed/tmdb/${category}?id=${id}${
    category === `tv` && `&s=${season}&e=${episode}`
  }`;

  React.useEffect(() => {
    const getDetail = async () => {
      const response: any = await tmdbApi.detail({ category, id });
      setItem(response.data);

      setLoading(false);
      scrollToTop();

      const episodeTotal = response.data.last_episode_to_air?.episode_number;
      const episodeList: IEpisode[] = [];
      for (let i = 0; i < episodeTotal; i++) {
        const epiRes = await tmdbApi.detail_episode({
          tv_id: Number(id),
          season_number: Number(season),
          episode_number: i + 1,
        });

        episodeList.push({
          id: epiRes?.data.id,
          episode_number: i + 1,
          name: epiRes?.data.name,
        });
      }
      setEpisodeData(episodeList);
    };

    const getTrailer = async () => {
      const response = await tmdbApi.getVideos({
        category,
        id: id,
      });
      setTrailers(response?.data?.results.slice(0, 4));
    };

    getTrailer();
    getDetail();
  }, [category, id, season]);

  const handleChangeSeason = (event: SelectChangeEvent) => {
    setSeason(event.target.value);
  };

  const handleChangeEpisode = (event: SelectChangeEvent) => {
    setEpisode(event.target.value);
  };

  const handleOpen = async (trailerKey: number) => {
    const modal = document.querySelector(`#modal-box`);

    const videoSrc = "https://www.youtube.com/embed/" + trailerKey;
    modal?.querySelector(".modal-video > iframe")?.setAttribute("src", videoSrc);

    setOpenTrailer(true);
  };

  const handleClose = () => {
    iframeRef.current.setAttribute("src", "");
    setOpenTrailer(false);
  };

  return (
    <React.Fragment>
      <title>Play Movie</title>

      {!loading ? (
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

              <div className="content-wrap">
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

                    <div className="movie-info__release">
                      <h2>Release</h2>
                      <span style={{ color: "#9e9e9e" }}>
                        {category === "movie" ? item?.release_date : item?.first_air_date}
                      </span>
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
                      <span style={{ color: "#9e9e9e" }}>
                        {item.production_countries[0]?.name ?? "undefined"}
                      </span>
                    </div>
                  </div>
                </div>

                <React.Fragment>
                  <div>
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
                        <Grid container sx={{ background: "#0f0f0f" }}>
                          <Grid item xs={3}>
                            <Select
                              value={season}
                              onChange={handleChangeSeason}
                              fullWidth
                              size="small"
                            >
                              {item.seasons.map((season) =>
                                season.season_number > 0 && season.air_date ? (
                                  <MenuItem key={season.id} value={season.season_number.toString()}>
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
                              {episodeData?.map((item) => (
                                <MenuItem key={item.id} value={item.episode_number.toString()}>
                                  Episode {item.episode_number}: {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                        </Grid>
                      </div>
                    ) : null}
                  </div>
                </React.Fragment>
              </div>

              <div className="container trailer mb-3">
                <h2 className="mb-2">Trailer(s)</h2>
                <Box sx={{ background: "#0f0f0f", display: "inline-flex" }}>
                  {trailers &&
                    trailers.map((item: any, index: number) =>
                      item.site === "YouTube" ? (
                        <ThemeProvider theme={buttonTheme} key={index}>
                          <Button
                            variant="outlined"
                            size="large"
                            sx={{ fontWeight: 600, textTransform: "initial" }}
                            onClick={() => handleOpen(item.key)}
                          >
                            Trailer {index + 1}
                          </Button>
                        </ThemeProvider>
                      ) : null
                    )}
                </Box>
              </div>
              <div className="container similar mb-3">
                <h2 className="mb-3">Similar</h2>
                <MoviesList category={category} id={Number(id)} type="similar" />
              </div>
            </React.Fragment>
          )}

          {/* Modal Trailer */}

          <ModalTrailer open={openTrailer}>
            <div className="modal-box" id={`modal-box`}>
              <div className="modal-close">
                <CloseIcon onClick={handleClose} />
              </div>
              <div className="modal-video">
                <iframe
                  ref={iframeRef}
                  allowFullScreen={true}
                  width="100%"
                  height="100%"
                  title="trailer"
                ></iframe>
              </div>
            </div>
          </ModalTrailer>
        </div>
      ) : (
        <div style={{ height: 1000 }} />
      )}
    </React.Fragment>
  );
};

export default PlayMovie;
