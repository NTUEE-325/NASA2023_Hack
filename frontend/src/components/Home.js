import React from "react";
import { Grid, Typography } from "@mui/material";
import planet from "./../assets/planet.png";
const Home = () => {
  return (
    <Grid container sx={{ paddingTop: "18vh" }}>
      <Grid
        item
        xs={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img src={planet} style={{ width: "30vw", height: "30vw" }} />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          paddingLeft: "5vw",
          paddingRight: "5vw",
          verticalAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{ color: "rgb(255,255,255)", fontSize: 70, marginBottom: "3vh" }}
        >
          Immersed in the Sounds of Space
        </Typography>
        <Typography sx={{ color: "rgb(255,255,255)", fontSize: 30 }}>
          Hi! We are students from NTUEE, and we want to build a sonification
          website accessible to everyone, allowing 3D fly through video,
          multi-channel!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
