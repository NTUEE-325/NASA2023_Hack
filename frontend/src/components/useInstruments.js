import * as Tone from "tone";
import {
  bassoon_urls,
  clarinet_urls,
  contrabass_urls,
  piano_urls,
} from "./instruments";

const useInstruments = () => {
  const piano = new Tone.Sampler({
    urls: piano_urls,
    onload: () => {
      console.log("Finish loading piano!");
    },
  }).toDestination();
  const bassoon = new Tone.Sampler({
    urls: bassoon_urls,
    onload: () => {
      console.log("Finish loading bassoon!");
    },
  }).toDestination();
  const clarinet = new Tone.Sampler({
    urls: clarinet_urls,
    onload: () => {
      console.log("Finish loading clarinet!");
    },
  }).toDestination();

  const contrabass = new Tone.Sampler({
    urls: contrabass_urls,
    onload: () => {
      console.log("Finish loading contrabass!");
    },
  }).toDestination();

  const init_Inst = () => {
    Tone.loaded();
  };

  return { piano, bassoon, clarinet, contrabass, init_Inst };
};

export default useInstruments;
