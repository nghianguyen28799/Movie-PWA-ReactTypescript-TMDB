import React from "react";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import { IVideo } from "../../interfaces/Movies";
import PlayIcon from "../../assets/icons/play.png";
import apiConfig from "../../api/apiConfig";
import { ThemeProvider } from "@mui/material/styles";
import { buttonTheme } from "../../common/buttotTheme";
import { Button } from "@mui/material";

const MultipleSearch = () => {
  const params: { query: string } = useParams();
  const { query } = params;

  const [data, setData] = React.useState<IVideo[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [dataTotal, setDataTotal] = React.useState<number>(0);

  React.useEffect(() => {
    const getMultiSearch = async () => {
      page !== 1 && setPage(1);
      const response = await tmdbApi.multiple_search({
        query,
        page: 1,
      });
      setData(response.data.results);
      setDataTotal(response.data.total_results);
    };
    getMultiSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onLoadMore = async () => {
    setPage(page + 1);
    const response = await tmdbApi.multiple_search({
      query,
      page: page + 1,
    });
    setData([...data, ...response.data.results]);
  };

  return (
    <div className="container category">
      <div className="category__header">
        <h2>Library</h2>
        <p>Search result for: {query}</p>
      </div>
      {data.length ? (
        <React.Fragment>
          <div className="category__movies-list">
            {data.map((item, index) => (
              <div className="movie-cart-box" key={index}>
                <Link to={`/playvideo/${item.media_type}/${item.id}`}>
                  <div className="movie-card">
                    <div
                      className="movie-card__image"
                      style={{
                        backgroundImage: `url(${apiConfig.w500Image(
                          item.poster_path
                            ? item.poster_path
                            : item.backdrop_path
                            ? item.backdrop_path
                            : "undefined"
                        )})`,
                      }}
                    ></div>
                    <img src={PlayIcon} alt="" />
                    <div className="movie-card__release">
                      {item?.release_date?.split("-")[0] || item?.first_air_date?.split("-")[0]}
                    </div>
                  </div>
                  <div className="movie-card__title">
                    <h5>{item.title ?? item.name}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="category__load-more">
            {dataTotal !== data?.length ? (
              <ThemeProvider theme={buttonTheme}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ fontWeight: 600, textTransform: "initial" }}
                  onClick={onLoadMore}
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
  );
};

export default MultipleSearch;
