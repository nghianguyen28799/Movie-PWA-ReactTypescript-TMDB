import React from "react";
// import Wallpaper from "../../assets/images/movie-wallpapers.jpg";
// import { colors } from "../../common/colors";
import "./Footer.scss";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer">
        {/* <div className="footer__img" style={{ backgroundImage: `url(${Wallpaper})` }}> */}
          <div className="author">
            <h4>Designed By: NghiaNT28799</h4>
          </div>
        {/* </div> */}
      </div>
    </React.Fragment>
  );
};

export default Footer;
