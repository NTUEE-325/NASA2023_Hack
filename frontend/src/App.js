import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import Explore from "./components/Explore";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
