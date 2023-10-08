import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Multi from "./components/Multi";
import theme from "./components/theme";
import Custom from "./components/Custom";
import { ThemeProvider } from "@emotion/react";
import useInstruments from "./components/useInstruments";

const App = () => {
  const { init_Inst } = useInstruments();
  useEffect(() => {
    init_Inst();
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/multi" element={<Multi />} />
            <Route path="/custom" element={<Custom />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
