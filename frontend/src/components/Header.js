import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import "./App.css";

const Header = () => {
  const [value, setValue] = useState("0");
  const navigate = useNavigate();

  const handleClick = (event, newValue) => {
    // console.log(newValue);
    setValue(newValue);
    if (newValue === "0") {
      navigate("/");
    } else if (newValue === "1") {
      navigate("/explore");
    } else if (newValue === "2") {
      navigate("/multi");
    } else {
      navigate("/custom");
    }
  };

  return (
    <div
      style={{
        marginTop: "4vh",
        backgroundColor: "rgba(255,255,255, 0.2)",
        width: "50vw",
        height: "8vh",
        position: "absolute",
        right: "0px",
        color: "rgb(255,255,255)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <Tabs
        value={value}
        onChange={handleClick}
        centered
        fontFamily="Roboto Condensed"
        textColor="secondary"
        sx={{
          "& button:hover": { backgroundColor: "rgba(255,255,255, 0.1)" },
        }}
      >
        <Tab label="01 Home" value="0" />
        <Tab label="02 Fly through" value="1" />
        <Tab label="03 Multi-channel" value="2" />
        <Tab label="04 Custom" value="3" />
      </Tabs>
    </div>
  );
};

export default Header;
