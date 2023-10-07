import React, { useState, useRef, useEffect } from "react";

import test_video from "./../assets/01.mp4";

let prevMs = -1;

const Explore = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // const capture = () => {
  //   const nowMs = Date.now();
  //   if (prevMs !== nowMs) {
  //     let video = videoRef.current;
  //     let canvas = canvasRef.current;
  //     if (canvas !== null) {
  //       let width = video.videoWidth;
  //       let height = video.videoHeight;
  //       let radius = video.videoHeight - 50;
  //       let avg_width = 5;
  //       const ctx = canvas.getContext("2d", { willReadFrequently: true });
  //       ctx.clearRect(0, 0, width, height);
  //       ctx.drawImage(video, 0, 0, width, height);
  //       ctx.strokeStyle = "white";
  //       ctx.beginPath();
  //       for (var i = 0; i <= 360; i++) {
  //         let x = width / 2 + radius * Math.cos(10);
  //         let y = height / 2 + radius * Math.sin(10);
  //         const data = ctx.getImageData(
  //           x - 2,
  //           y - 2,
  //           avg_width,
  //           avg_width
  //         ).data;
  //         let colorSum = 0;

  //         for (let x = 0, len = data.length; x < len; x += 4) {
  //           colorSum += 0.2126 * data[x];
  //           colorSum += 0.7152 * data[x + 1];
  //           colorSum += 0.0722 * data[x + 2];
  //         }

  //         const brightness = Math.floor(colorSum / (avg_width * avg_width));
  //         // Luminance = 0.2126*R + 0.7152*G + 0.0722*B
  //         // setText(brightness);
  //         let calc_x = width / 2 + (radius + brightness) * Math.cos(10);
  //         let calc_y = height / 2 + (radius + brightness) * Math.sin(10);
  //         if (i === 0) {
  //           ctx.moveTo(calc_x, calc_y);
  //         } else {
  //           ctx.lineTo(calc_x, calc_y);
  //         }
  //       }
  //       ctx.closePath();
  //       ctx.stroke();
  //       ctx.save();
  //       ctx.restore();

  //       window.requestAnimationFrame(capture);
  //       prevMs = nowMs;
  //     }
  //   }
  // };

  useEffect(() => {
    return () => {
      // window.cancelAnimationFrame(capture);
    };
  }, []);

  return (
    <div>
      <video
        autoPlay
        loop
        muted
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <source src={test_video} />
      </video>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      ></canvas>
    </div>
  );
};

export default Explore;
