import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Multi from "./components/Multi";
import theme from "./components/theme";
import Custom from "./components/Custom";
import { ThemeProvider } from "@emotion/react";
import InstrumentContext from "./components/useInstruments";
import {
  bassoon_urls,
  clarinet_urls,
  contrabass_urls,
  piano_urls,
} from "./components/instruments";
import * as Tone from "tone";

const App = () => {
  const panner1 = new Tone.Panner3D({
    panningModel: "HRTF",
    positionX : 0,
    positionY : 0,
    positionZ : 2,
  }).toDestination();
  const panner2 = new Tone.Panner3D({
    panningModel: "HRTF",
    positionX : 0,
    positionY : 0,
    positionZ : 2,
  }).toDestination();
  const panner3 = new Tone.Panner3D({
    panningModel: "HRTF",
    positionX : -2,
    positionY : 0,
    positionZ : 2,
  }).toDestination();
  const panner4 = new Tone.Panner3D({
    panningModel: "HRTF",
    positionX : -2,
    positionY : 0,
    positionZ : -2,
  }).toDestination();

  const piano = new Tone.Sampler({
    urls: piano_urls,
    onload: () => {
      console.log("Finish loading piano!");
    },
  }).connect(panner1);
  const bassoon = new Tone.Sampler({
    urls: bassoon_urls,
    onload: () => {
      console.log("Finish loading bassoon!");
    },
  }).connect(panner2);
  const clarinet = new Tone.Sampler({
    urls: clarinet_urls,
    onload: () => {
      console.log("Finish loading clarinet!");
    },
  }).connect(panner3);
  const contrabass = new Tone.Sampler({
    urls: contrabass_urls,
    onload: () => {
      console.log("Finish loading contrabass!");
    },
  }).connect(panner4);

  const value = { piano, bassoon, clarinet, contrabass };
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <InstrumentContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<Wrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/multi" element={<Multi />} />
              <Route path="/custom" element={<Custom />} />
            </Route>
          </Routes>
        </InstrumentContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
