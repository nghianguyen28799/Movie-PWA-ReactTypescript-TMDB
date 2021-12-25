import React from "react";
import "./MoviesList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi from "../../api/tmdbApi";
import { IVideo } from "../../interfaces/Movies";
import MovieCard from "../MovieCard/MovieCard";
import { skeletonData } from "../../common/skeletonData";

interface IMoviesList {
  category: string;
  type: string;
  id?: number;
}

const MoviesList = (props: IMoviesList) => {
  const [items, setItems] = React.useState<IVideo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

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
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="movies-list">
      <Swiper grabCursor={true} spaceBetween={15} slidesPerView={"auto"}>
        {!loading
          ? items.map((item, index) => (
              <SwiperSlide key={index}>
                <MovieCard item={item} category={props.category} />
              </SwiperSlide>
            ))
          : skeletonData.map((item, index) => (
              <SwiperSlide key={index}>
                <MovieCard item={item} category={props.category} loading={true} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default MoviesList;
