import React, { useState, useRef, useEffect } from "react";
import { useOpenCv } from "opencv-react";
import test_video from "../assets/01.mp4";

let prevMs = -1;

const Explore = () => {
  const {load, cv} = useOpenCv();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let reqID = null;
  let frame0 = null; // old
  let frame1 = null; // new
  let frameGray0 = null; // old
  let frameGray1 = null; // new
  let src = null;
  let dst = null;
  const capture = () => {
    const nowMs = Date.now();
    let canvas = canvasRef.current;
    
    if (prevMs !== nowMs) {
      let video = videoRef.current;
      if (canvas !== null) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        src = cv.matFromImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));

        if(src.data.length !== 0 ){
          cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
          frame1 = frame0.clone();
          frame0 = dst.clone();
          // start optical flow
          let winSize = new cv.Size(15, 15);
          let maxLevel = 2;
          let criteria = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 0.03);

          // Apply thresholding
          const thresholdValue = 20;
          let binary = new cv.Mat()
          cv.threshold(frame0, binary, thresholdValue, 255, cv.THRESH_BINARY);

          // Find contours
          let contours = new cv.MatVector();
          let hierarchy = new cv.Mat();
          
          cv.findContours(
            binary,
            contours,
            hierarchy,
            cv.RETR_CCOMP,
            cv.CHAIN_APPROX_SIMPLE
          );
          // Filter and draw the contours
          const minContourArea = 1;
          let contours_arr = []
          let contours_area = []
          for(let i=0; i<contours.size(); i++){
            contours_arr.push(contours.get(i));
            contours_area.push(cv.contourArea(contours.get(i)));
          }
          const filteredContours = contours_arr.filter(
            (contour) => cv.contourArea(contour) > minContourArea
          );
          let target_points = filteredContours.map((contour) => {
            const moments = cv.moments(contour);
            const centerX = moments.m10 / moments.m00;
            const centerY = moments.m01 / moments.m00;
            return [centerX, centerY]; // Return an array containing both centerX and centerY
          });

          // Log the coordinates to the console
          let p0 = cv.matFromArray(target_points.length, 2, cv.CV_32F, [].concat(...target_points))
          let st = new cv.Mat();
          let err = new cv.Mat();
          let p1 = new cv.Mat();
          if(target_points.length !== 0){
            cv.calcOpticalFlowPyrLK(frame0, frame1, p0, p1, st, err, winSize, maxLevel, criteria);
            console.log('DONE');

            // use st to decide which point tracked to use
            // select good points
            let goodNew = [];
            let goodOld = [];
            let diff = [];
            for (let i = 0; i < st.rows; i++) {
              if (st.data[i] === 1) {
                goodNew.push([p1.data32F[i*2], p1.data32F[i*2+1]]);
                goodOld.push([p0.data32F[i*2], p0.data32F[i*2+1]]);
                console.log(goodNew)
                console.log(goodOld)
              }
            }
            for(let i = 0; i < goodNew.length; i++){
              diff.push([goodNew[i][0]-goodOld[i][0], goodNew[i][1]-goodOld[i][1]])
              console.log(diff)
            }
          }
          // then evaluate the displacement
        }
        reqID = window.requestAnimationFrame(capture);
        prevMs = nowMs;
      }
    }
    
    
  };

  useEffect(() => {
    if(cv){
      let canvas = canvasRef.current;
      frame0 = new cv.Mat.zeros(canvas.height, canvas.width, cv.CV_8U); // old
      frame1 = new cv.Mat.zeros(canvas.height, canvas.width, cv.CV_8U); // new
      src = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC4);
      dst = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC1);
      frameGray0 = new cv.Mat(); // old
      frameGray1 = new cv.Mat(); // new
      capture();
    }
    return () => {
      console.log("leaving");
      frameGray0.delete();
      frameGray1.delete();
      src.delete();
      dst.delete();
      if (reqID != null) {
        window.cancelAnimationFrame(reqID);
      }
    };
  }, [cv]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: 1200,
          height: 720,
          position: "absolute",
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      ></canvas>
      <video
        autoPlay
        loop
        muted
        ref={videoRef}
        style={{
          width: 1200,
          height: 720,
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