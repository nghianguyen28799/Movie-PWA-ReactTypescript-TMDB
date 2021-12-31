import React from "react";
import "./NotFound.scss";
import NotFoundLogo from "../../assets/images/404-error.png";
import { Button, useMediaQuery } from "@mui/material";
import { colors } from "../../common/colors";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  const mobileScreen = useMediaQuery("(min-width:600px)");
  const tabletScreen = useMediaQuery("(min-width:1024px)");

  return (
    <React.Fragment>
      <title>Not Found</title>
      <div className="container not-found">
        <img src={NotFoundLogo} alt="notfound" />
        <Button
          variant="contained"
          sx={{
            background: colors.mainColor,
            marginTop: 5,
            fontWeight: 600,
            color: colors.txtColor,
            fontSize: tabletScreen && mobileScreen ? "1.5rem" : "auto",
          }}
          onClick={() => history.push("/home")}
        >
          Go to homepage
        </Button>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
