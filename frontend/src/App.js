import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Multi from "./components/Multi";
import theme from "./components/theme";
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

  const panner_piano = new Tone.Panner3D({
    panningModel: "HRTF",
    positionX : -1.732,
    positionY : 0,
    positionZ : -1,
  }).toDestination();
  const panner_bossoon = new Tone.Panner3D({
    panningModel: "HRTF",
    positionX : 1.732,
    positionY : 0,
    positionZ : -1,
  }).toDestination();
  const panner_clarinet = new Tone.Panner3D({
    panningModel: "HRTF",
    positionX : 0,
    positionY : 0,
    positionZ : 2,
  }).toDestination();
  const panner_contrabass = new Tone.Panner3D({
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
  }).connect(panner_piano);
  const bassoon = new Tone.Sampler({
    urls: bassoon_urls,
    onload: () => {
      console.log("Finish loading bassoon!");
    },
  }).connect(panner_bossoon);
  const clarinet = new Tone.Sampler({
    urls: clarinet_urls,
    onload: () => {
      console.log("Finish loading clarinet!");
    },
  }).connect(panner_clarinet);
  const contrabass = new Tone.Sampler({
    urls: contrabass_urls,
    onload: () => {
      console.log("Finish loading contrabass!");
    },
  }).connect(panner_contrabass);

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
            </Route>
          </Routes>
        </InstrumentContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
