import React from "react";
import "./MovieCard.scss";
import { IVideo } from "../../interfaces/Movies";
import apiConfig from "../../api/apiConfig";
import { Link } from "react-router-dom";
import PlayIcon from "../../assets/icons/play.png";
interface IMovieCard {
  item: IVideo;
  category: string;
}
const MovieCard = (props: IMovieCard) => {
  const { item, category } = props;

  const link = "/playvideo/" + category + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card">
        <div className="movie-card__image" style={{ backgroundImage: `url(${bg})` }}></div>
        <img src={PlayIcon} alt="" />
      </div>
      <div className="movie-card__title">
        <h5>{item.title ?? item.name}</h5>
      </div>
    </Link>
  );
};

export default MovieCard;
