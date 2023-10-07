import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "rgb(255,255,255)",
            borderRadius: "25px",
          },
        },
      },
    },
  },
});
