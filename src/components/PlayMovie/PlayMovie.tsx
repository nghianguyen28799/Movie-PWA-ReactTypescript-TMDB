import React from "react";
import { useParams } from "react-router-dom";
import "./PlayMovie.scss";

const PlayMovie = () => {
  const params: any = useParams();
  
  const iframeSrc = `https://www.2embed.ru/embed/tmdb/${params["category"]}?id=${params["id"]}`

  console.log(iframeSrc);
  
  return <div>ádsad</div>;
};

export default PlayMovie;
