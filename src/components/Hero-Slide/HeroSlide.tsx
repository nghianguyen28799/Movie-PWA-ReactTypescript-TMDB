import { ThemeProvider } from "@emotion/react";
import { Button, useMediaQuery } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper/core";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import { colors } from "../../common/colors";
import { IPopularMovieResults } from "../../interfaces/Movies";
import { IMovieRequest } from "../../interfaces/tmdbInterface";
import CirclarProgressBarComponent from "../CircularProgressBar/CircularProgressBar";
import "./HeroSlide.scss";
import ModalTrailer from "../Modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { buttonTheme } from "../../common/buttotTheme";
import { useHistory } from "react-router-dom";

interface IHeoroSlideItem {
  item: IPopularMovieResults;
  status: string;
  handleOpenTrailer: (id: number) => void;
}

SwiperCore.use([Navigation, Autoplay]);

const HeroSlide = () => {
  const [movieItems, setMovieItems] = React.useState<IPopularMovieResults[]>([]);
  const [openTrailer, setOpenTrailer] = React.useState<boolean>(false);
  const iframeRef = React.useRef<any>(null);

  React.useEffect(() => {
    const getMovie = async () => {
      const request: IMovieRequest = {
        type: "popular",
        page: 1,
      };
      try {
        const response = await tmdbApi.getMoviesList(request);
        setMovieItems(response.data.results.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, []);

  const handleOpen = async (id: number) => {
    const modal = document.querySelector(`#modal-box`);

    const getVideo = await tmdbApi.getVideos({
      category: "movie",
      id: id,
    });

    if (getVideo?.data.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + getVideo?.data.results[0].key;
      modal?.querySelector(".modal-video > iframe")?.setAttribute("src", videoSrc);
    } else {
      const modalVideo: any = document.querySelector(".modal-video");
      modalVideo.innerHTML = "No Trailer";
    }
    setOpenTrailer(true);
  };

  const handleClose = () => {
    iframeRef.current.setAttribute("src", "");
    setOpenTrailer(false);
  };

  return (
    <React.Fragment>
      <div className="hero-slide">
        <Swiper
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000 }}
        >
          {movieItems.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <HeroSlideItem
                  item={item}
                  status={`${isActive ? "active" : ""}`}
                  handleOpenTrailer={handleOpen}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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
    </React.Fragment>
  );
};

const HeroSlideItem = (props: IHeoroSlideItem) => {
  const history = useHistory();

  const { item, status } = props;

  const mobileScreen = useMediaQuery("(min-width:600px)");
  const tabletScreen = useMediaQuery("(min-width:1024px)");

  const background = apiConfig.originalImage(item.poster_path);

  const onWatchNow = () => {
    history.push(`/playvideo/movie/${item.id}`);
  };

  return (
    <div className={`hero-slide__item ${status}`} style={{ backgroundImage: `url(${background})` }}>
      <div className="hero-slide__item__content__info">
        <div className="title">
          <h1>{item.title}</h1>
        </div>
        <div className="user-core">
          <div className="user-core__progress">
            <CirclarProgressBarComponent percentage={item.vote_average * 10} />
          </div>
          <h2>User Core</h2>
        </div>
        <div className="button">
          <ThemeProvider theme={buttonTheme}>
            <Button
              size={!mobileScreen ? "medium" : "large"}
              variant="contained"
              sx={{
                fontWeight: 600,
                color: colors.txtColor,
                textTransform: "initial",
                fontSize: tabletScreen && mobileScreen ? "1.5rem" : "auto",
              }}
              onClick={onWatchNow}
            >
              Watch now
            </Button>
            <Button
              size={!mobileScreen ? "medium" : "large"}
              variant="outlined"
              sx={{
                fontWeight: 600,
                marginLeft: !mobileScreen ? "8px" : 2,
                textTransform: "initial",
                fontSize: tabletScreen && mobileScreen ? "1.5rem" : "auto",
              }}
              onClick={() => props.handleOpenTrailer(item.id)}
            >
              {mobileScreen ? "Watch trailer" : "Trailer"}
            </Button>
          </ThemeProvider>
        </div>
        <div className="description">
          <p>{item.overview}</p>
        </div>
      </div>
      <div className="hero-slide__item__content__poster">
        <img src={apiConfig.w500Image(item.poster_path)} alt="" />
      </div>
    </div>
  );
};

export default HeroSlide;
