import { Button, ThemeProvider } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { buttonTheme } from "../../common/buttotTheme";
import "./ErrorFallback.scss";

const ErrorFallback = () => {
  const history = useHistory();

  const goBack = () => {
      history.goBack();
  };

  return (
    <div className="container error-fallback">
      <h2>Something went wrong</h2>
      <ThemeProvider theme={buttonTheme}>
        <Button
          variant="outlined"
          size="large"
          sx={{ fontWeight: 600, textTransform: "initial", marginTop: 2 }}
          onClick={goBack}
        >
          Go back
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default ErrorFallback;
