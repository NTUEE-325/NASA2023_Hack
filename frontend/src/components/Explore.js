import React, { useRef, useEffect, useContext } from "react";
import InstrumentContext from "./useInstruments";
import test_video from "./../assets/01.mp4";

let prevMs = -1;

const Explore = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { piano, bassoon, clarinet, contrabass } =
    useContext(InstrumentContext);
  let reqID = null;

  const capture = () => {
    const nowMs = Date.now();
    if (prevMs !== nowMs) {
      let video = videoRef.current;
      let canvas = canvasRef.current;
      if (canvas !== null) {
        let width = canvas.width;
        let height = canvas.height;
        let radius = 40;
        let avg_width = 5;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(video, 0, 0, width, height);

        ctx.strokeStyle = "white";
        ctx.beginPath();
        // for (var i = 0; i <= 360; i++) {
        //   let x = 50 + radius * Math.cos(i);
        //   let y = 70 + radius * Math.sin(i);
        //   // const data = ctx.getImageData(
        //   //   x - 2,
        //   //   y - 2,
        //   //   avg_width,
        //   //   avg_width
        //   // ).data;
        //   // let colorSum = 0;

        //   // for (let x = 0, len = data.length; x < len; x += 4) {
        //   //   colorSum += 0.2126 * data[x];
        //   //   colorSum += 0.7152 * data[x + 1];
        //   //   colorSum += 0.0722 * data[x + 2];
        //   // }

        //   // const brightness = Math.floor(colorSum / (avg_width * avg_width));
        //   // // Luminance = 0.2126*R + 0.7152*G + 0.0722*B
        //   // // setText(brightness);
        //   // let calc_x = width / 2 + (radius + brightness) * Math.cos(10);
        //   // let calc_y = height / 2 + (radius + brightness) * Math.sin(10);
        //   if (i === 0) {
        //     // ctx.moveTo(calc_x, calc_y);
        //     ctx.moveTo(x, y);
        //   } else {
        //     // ctx.lineTo(calc_x, calc_y);
        //     ctx.lineTo(x, y);
        //   }
        // }

        ctx.arc(width / 2, height / 2, 30, 0, 2 * Math.PI);
        ctx.stroke();

        reqID = window.requestAnimationFrame(capture);
        prevMs = nowMs;
      }
    }
  };

  useEffect(() => {
    capture();
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
          width: 1080,
          height: 540,
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
          width: 1080,
          height: 540,
          zIndex: 0,
          visibility: "hidden",
        }}
      >
        <source src={test_video} />
      </video>
    </div>
  );
};

export default Explore;
