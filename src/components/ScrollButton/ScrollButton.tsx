import React from "react";
import "./ScrollButton.scss";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IconButton } from "@mui/material";
import { colors } from "../../common/colors";
import { scrollToTop } from "../../common/ScrollToTop";

const ScrollButton = () => {
  const buttonRef = React.useRef<any>();

  React.useEffect(() => {
    const scrollPage = () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        buttonRef.current.classList.add("scroll-display");
      } else {
        buttonRef.current.classList.remove("scroll-display");
      }
    };
    window.addEventListener("scroll", scrollPage);
    return () => {
      window.removeEventListener("scroll", scrollPage);
    };
  }, []);

  return (
    <div className="scroll-button" ref={buttonRef}>
      <IconButton
        aria-label="delete"
        size="large"
        sx={{ background: "#3e3e3e" }}
        onClick={scrollToTop}
      >
        <KeyboardDoubleArrowUpIcon fontSize="large" sx={{ color: colors.mainColor }} />
      </IconButton>
    </div>
  );
};

export default ScrollButton;
