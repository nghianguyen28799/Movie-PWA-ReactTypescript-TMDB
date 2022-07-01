import React from "react";
import "./MovieCard.scss";
import { IVideo, IVideoTemp } from "../../interfaces/Movies";
import apiConfig from "../../api/apiConfig";
import { Link } from "react-router-dom";
import PlayIcon from "../../assets/icons/play.png";
import { Skeleton, useMediaQuery } from "@mui/material";
import LazyImage from "../LazyImage/LazyImage";
interface IMovieCard {
  item: IVideo | IVideoTemp;
  category: string;
  loading?: boolean;
}
const MovieCard = (props: IMovieCard) => {
  const mobileScreen = useMediaQuery("(min-width:600px)");
  const tabletScreen = useMediaQuery("(min-width:1024px)");

  const { item, category } = props;
  const loading = props.loading ?? false;

  const link = "/playvideo/" + category + "/" + item.id;

  let bg = "";
  if (item.poster_path || item.backdrop_path) {
    bg = apiConfig.w500Image(item.poster_path ?? item.backdrop_path);
  }

  const widthLaptop = 250;
  const widthTablet = 200;
  const widthMobile = 80;

  const heightLaptop = 360;
  const heightTablet = 280;
  const heightMobile = 120;

  const width =
    !mobileScreen && !tabletScreen
      ? widthMobile
      : mobileScreen && !tabletScreen
      ? widthTablet
      : widthLaptop;
  const height =
    !mobileScreen && !tabletScreen
      ? heightMobile
      : mobileScreen && !tabletScreen
      ? heightTablet
      : heightLaptop;

  return (
    <React.Fragment>
      {!loading ? (
        <Link to={link}>
          <div className="movie-card">
            <div className="movie-card__image">
              <LazyImage src={bg} alt={`movie-image`} />
            </div>
            <img src={PlayIcon} alt="" className="icon-view" />
            <div className="movie-card__release">
              <p>
                {category === "movie"
                  ? item?.release_date?.split("-")[0]
                  : item?.first_air_date?.split("-")[0]}
              </p>
            </div>
          </div>
          <div className="movie-card__title">
            <h5>{item.title ?? item.name}</h5>
          </div>
        </Link>
      ) : (
        <React.Fragment>
          <Skeleton
            variant="rectangular"
            width={width}
            height={height}
            sx={{ borderRadius: "10px" }}
          />
          <Skeleton
            variant="rectangular"
            width={width}
            height={mobileScreen ? 24 : 12}
            sx={{ marginTop: "0.6rem", borderRadius: 1 }}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MovieCard;
