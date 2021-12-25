import React from "react";
import "./MoviesList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi from "../../api/tmdbApi";
import { IVideo } from "../../interfaces/Movies";
import MovieCard from "../MovieCard/MovieCard";

interface IMoviesList {
  category: string;
  type: string;
  id?: number;
}

const MoviesList = (props: IMoviesList) => {
  const [items, setItems] = React.useState<IVideo[]>([]);

  React.useEffect(() => {
    const getList = async () => {
      let response = null;
      if (props.category !== "similar") {
        switch (props.category) {
          case "movie":
            response = await tmdbApi.getMoviesList({ type: props.type, page: 1 });
            break;
          default:
            response = await tmdbApi.getTvList({ type: props.type, page: 1 });
        }
      } else {
        response = await tmdbApi.similar({ category: "similar", id: props.id, page: 1 });
      }
      setItems(response?.data.results);
    };
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="movies-list">
      <Swiper grabCursor={true} spaceBetween={15} slidesPerView={"auto"}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoviesList;
