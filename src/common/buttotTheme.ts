import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

export const buttonTheme = createTheme({
  palette: {
    primary: {
      main: colors.mainColor,
    },
  },
});
