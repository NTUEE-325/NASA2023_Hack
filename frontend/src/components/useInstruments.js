import * as Tone from "tone";
import { createContext } from "react";

const InstrumentContext = createContext({
  piano: Tone.Sampler,
  bassoon: Tone.Sampler,
  clarinet: Tone.Sampler,
  contrabass: Tone.Sampler
});

export default InstrumentContext;
