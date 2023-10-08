import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Multi from "./components/Multi";
import theme from "./components/theme";
import { ThemeProvider } from "@emotion/react";
import { OpenCvProvider } from "opencv-react";

const App = () => {
  return (
    <OpenCvProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Wrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/multi" element={<Multi />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </OpenCvProvider>
  );
};

export default App;
