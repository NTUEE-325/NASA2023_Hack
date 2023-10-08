import React, { useRef, useEffect, useContext, useState } from "react";
import InstrumentContext from "./useInstruments";
import { Button } from "@mui/material";
import test_video from "./../assets/01.mp4";
import * as Tone from "tone";
import { piano_mapping, bassoon_mapping, clarinet_mapping, contrabass_mapping } from "../constant/pitch";
import { directions } from "../constant/direction"

let prevMs = -1;

let prevSoundMs = 0;
let nextSoundMs;
let soundCounter = 0;

const Explore = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isplayed, setIsPlayed] = useState(false);
  const { piano, bassoon, clarinet, contrabass } = useContext(InstrumentContext);
  let reqID = null;

  const capture = () => {
    const nowMs = Date.now();
    if (prevMs !== nowMs) {
      let video = videoRef.current;
      let canvas = canvasRef.current;
      if (canvas !== null) {

        let width = video.videoWidth;
        let height = video.videoHeight;

        if (width <= 0 || height <= 0) {
          reqID = window.requestAnimationFrame(capture);
          return;
        }

        canvas.width = width;
        canvas.height = height;

        let radius = height/2 - 100;
        let range = 50;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(video, 0, 0, width, height);

        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
        ctx.stroke();

        let x = width/2 - radius - range;
        let y = height/2 - radius - range;

        const frame = ctx.getImageData(x, y, (2 * radius + 2 * range), (2 * radius + 2 * range));

        /* --------------- Calculation -----------------*/
        let selected = [];
        for (let i = -radius; i <= radius; i++) {
          for (let j = -radius; j <= radius; j++) {
            let square = i * i + j * j;
            if (square < radius + range && square > radius - range ) {

            } else {
              continue;
            }

            let row_base = (radius + i);
            let col_base = (radius + j);

            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;

            for(let k = -10; k <= 10; k++) {
              for (let k2 = -10; k <= 10; k++) {
                let row = row_base + k;
                let col = col_base + k2;
                r += frame.data[(4 * (row * radius + col) + 0)];
                g += frame.data[(4 * (row * radius + col) + 1)];
                b += frame.data[(4 * (row * radius + col) + 2)];
                a += frame.data[(4 * (row * radius + col) + 3)];
              }
            }

            let bright = (r + g + b);

            if (bright > 90) {
              if (selected.find(e => Math.abs(e.col_base - col_base) < 10 && Math.abs(e.row_base - row_base) < 10)){
                continue;
              } else {
                selected[selected.length] = {r, g, b, row_base, col_base};  
              }
            }
          }
        }
        /* --------------- Calculation -----------------*/

        if (selected.length > 0) {
          nextSoundMs = Date.now();
          if (prevSoundMs == 0 || nextSoundMs - prevSoundMs > 7/29){
            prevSoundMs = nextSoundMs;

            let direction = directions[soundCounter];
            soundCounter = (soundCounter + 1) % directions.length;

            console.log(direction);
            console.log(soundCounter);
            console.log("sound");

            /* --------------- mapping light to sound -----------------*/
            //
            // color to instrument
            // R --> piano
            // G --> bassoon
            // B --> clarinet
            // 
            // brightness to velocity (how loud sound is)
            // brightness [0:250] to velocity [-1:1]
            // 
            // angle to pitch
            // 360 -> (pitch).length
            //
            /* --------------- mapping light to sound -----------------*/
            const colors = ["r", "g", "b"];
            const color2instrument = {"r": piano, "g": bassoon, "b": clarinet};
            const color2pitch = {"r": piano_mapping, "g": bassoon_mapping, "b": clarinet_mapping};
            const max_brightness = 250;

            for (let i = 0; i < Math.min(2, selected.length); i++) {
              for (let j = 0; j < 3; j++) {
                let color = colors[j];
  
                let pitch_numbers = color2pitch[color].length;
                let angle_interval = 2 * Math.PI / pitch_numbers;
  
                let x = selected[i].row_base - radius;
                let y = selected[i].col_base - radius;
                let theta = Math.atan2(y, x) + Math.PI;         // Math.atan2(y, x)
  
                let pitch = Math.floor(theta / angle_interval);
  
                let brightness = selected[i].r + selected[i].g + selected[i].b;
                if (brightness > max_brightness) brightness = max_brightness;
                let velocity = (brightness / max_brightness) - 0.8;
                
                // console.log (pitch, y, x, theta, angle_interval);
                // console.log (pitch_numbers);
  
                color2instrument[color].triggerAttackRelease(
                  [color2pitch[color][pitch]],
                  7/29,
                  Tone.now(),
                  velocity
                )
              }

              Tone.Listener.forwardX.value = Math.sin(1.23);
              Tone.Listener.forwardZ.value = -Math.cos(1.23);
            }
          }
        }

        reqID = window.requestAnimationFrame(capture);
        prevMs = nowMs;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (reqID != null) {
        window.cancelAnimationFrame(reqID);
      }
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      ></canvas>
      <video
        autoPlay
        loop
        muted
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 0,
          visibility: "hidden",
        }}
      >
        <source src={test_video} />
      </video>
      <Button
        variant="outlined"
        
        onClick={() => {
          setIsPlayed(true);
          capture();
        }}
        sx={{
          position: "absolute",
          marginTop: "80vh",
          width: "20vw",
          left: "40vw",
          right: "40vw",
          zIndex:2,
          display:isplayed ? "none" : "",
        }}
      >
        Start Sonification!
      </Button>
    </div>
  );
};

export default Explore;

