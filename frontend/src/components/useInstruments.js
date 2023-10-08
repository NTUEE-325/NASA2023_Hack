import * as Tone from "tone";
import { createContext } from "react";

// const useInstruments = () => {
//   const piano = new Tone.Sampler({
//     urls: piano_urls,
//     onload: () => {
//       console.log("Finish loading piano!");
//     },
//   }).toDestination();
//   const bassoon = new Tone.Sampler({
//     urls: bassoon_urls,
//     onload: () => {
//       console.log("Finish loading bassoon!");
//     },
//   }).toDestination();
//   const clarinet = new Tone.Sampler({
//     urls: clarinet_urls,
//     onload: () => {
//       console.log("Finish loading clarinet!");
//     },
//   }).toDestination();

//   const contrabass = new Tone.Sampler({
//     urls: contrabass_urls,
//     onload: () => {
//       console.log("Finish loading contrabass!");
//     },
//   }).toDestination();

//   const init_Inst = () => {
//     Tone.loaded();
//   };

//   return { piano, bassoon, clarinet, contrabass, init_Inst };
// };

const InstrumentContext = createContext({
  piano: Tone.Sampler,
  bassoon: Tone.Sampler,
  clarinet: Tone.Sampler,
  contrabass: Tone.Sampler,
});
// export default useInstruments;
export default InstrumentContext;
