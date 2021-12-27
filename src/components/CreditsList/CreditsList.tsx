import React from "react";
import tmdbApi from "../../api/tmdbApi";
import "./CreditsList.scss";

const CreditsList = (props: { category: string; id: number | string }) => {
  const { category, id } = props;
  const [casts, setCasts] = React.useState<any>();

  React.useEffect(() => {
    const getData = async () => {
      const response = await tmdbApi.credits({ category, id });
      setCasts(response?.data.cast.slice(0, 10));
    };
    getData();
  }, []);

  return (
    <div className="casts">
      {casts &&
        casts.map((cast: any, index: number) => (
          <React.Fragment key={cast.id}>
            <span style={{ color: "#9e9e9e"}}>
              {cast.name}
              {index !== casts.length - 1 ? "," : null} &nbsp;
            </span>
          </React.Fragment>
        ))}
    </div>
  );
};

export default CreditsList;
