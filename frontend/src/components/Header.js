import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import "./App.css";

const Header = () => {
  const [value, setValue] = useState("0");
  const navigate = useNavigate();

  const handleClick = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    if (newValue == "0") {
      navigate("/");
    } else if (newValue == "1") {
      navigate("/explore");
    } else {
      navigate("/multi");
    }
  };

  return (
    <div
      style={{
        marginTop: "5vh",
        backgroundColor: "rgba(255,255,255, 0.2)",
        width: "48vw",
        height: "8vh",
        position: "absolute",
        right: "0px",
        color: "rgb(255,255,255)",
        display: "flex",
        alignItems: "center",
        verticalAlign: "center",
        textAlign: "center",
        fontFamily: "Roboto Condensed",
        fontSize: "20px",
      }}
    >
      <Tabs value={value} onChange={handleClick} variant="fullWidth">
        <Tab label="01 Home" value="0" />
        <Tab label="02 Fly through" value="1" />
        <Tab label="03 Multi-channel" value="2" />
      </Tabs>
    </div>
  );
};

export default Header;
