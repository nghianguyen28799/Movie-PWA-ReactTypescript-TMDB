import React from "react";
import Wallpaper from "../../assets/images/movie-wallpapers.jpg";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__img" style={{backgroundImage: `url(${Wallpaper})`}}></div>
    </div>
  );
};

export default Footer;
