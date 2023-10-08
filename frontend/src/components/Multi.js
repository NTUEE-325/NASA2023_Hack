// import React, { useState } from "react";
// import axios from "axios";
// import instance from "./api";
// import { Typography, Box } from "@mui/material";
// import { useOpenCv } from "opencv-react"

// const Multi = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const {loaded, cv} = useOpenCv();
//   const handleSubmit = async (e) => {
//     let formData = new FormData();
//     formData.append("data", selectedFile);
//     console.log(formData);
//     const response = await instance.post("/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     console.log(response);
//   };
//   const handleSelect = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const loadImg = () => {
//     var fileUploadEl = document.getElementById('file-upload'),
//       srcImgEl = document.getElementById('src-image')
  
//     fileUploadEl.addEventListener("change", function (e) {
//       srcImgEl.src = URL.createObjectURL(e.target.files[0]);
//     }, false);
  
//     srcImgEl.onload = function () {
//       var src = cv.imread(srcImgEl); // load the image from <img>
//       var dst = new cv.Mat();
  
//       cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    
//       cv.Canny(src, dst, 50, 100, 3, false); // You can try more different parameters
//       cv.imshow('the-canvas', dst); // display the output to canvas
  
//       src.delete(); // remember to free the memory
//       dst.delete();
//     }
  
//     // opencv loaded?
//     window.onOpenCvReady = function () {
//       document.getElementById('loading-opencv-msg').remove();
//     }
  
//   })()

//   return (
//     <Box
//       sx={{
//         backgroundColor: "rgb(255,255,255)",
//         width: "20vw",
//         height: "10vh",
//       }}
//     >
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleSelect} />
//         <input type="submit" value="Upload File" />
//       </form>
//     </Box>
//   );
// };

// export default Multi;

import React, { useState, useEffect } from "react";
import axios from "axios";
import instance from "./api";
import { Typography, Box } from "@mui/material";
import { useOpenCv } from "opencv-react";

const Multi = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { cv } = useOpenCv(); // Get the cv object from opencv-react

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!selectedFile) {
  //     alert("Please select a file");
  //     return;
  //   }

  //   try {
  //     let formData = new FormData();
  //     formData.append("data", selectedFile);

  //     console.log(formData);
  //     const response = await instance.post("/upload", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

  const handleSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    const fileUploadEl = document.getElementById("file-upload");
    const srcImgEl = document.getElementById("src-image");

    fileUploadEl.addEventListener("change", function (e) {
      srcImgEl.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    srcImgEl.onload = function () {
      if (cv) {
        var src = cv.imread(srcImgEl);
        var dst = new cv.Mat();

        cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);

        cv.Canny(src, dst, 50, 100, 3, false);
        cv.imshow('the-canvas', dst);

        src.delete();
        dst.delete();
      } else {
        console.error("OpenCV is not available.");
      }
    };

    // Ensure that OpenCV is ready
    window.onOpenCvReady = function () {
      console.log("OpenCV is ready.");
      document.getElementById('loading-opencv-msg').remove();
    };
  }, [cv]);

  return (
    <div>
      <Typography variant="h5">Multi Component</Typography>
      <input type="file" id="file-upload" onChange={handleSelect} />
      <div className="inputoutput">
        <img id="src-image" alt="No Image" />
      </div>
      <div className="inputoutput">
        <canvas id="the-canvas"></canvas>
      </div>
      <Box
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          width: "20vw",
          height: "10vh",
        }}
      >
        {/* <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleSelect} />
          <input type="submit" value="Upload File" />
        </form> */}
      </Box>
    </div>
  );
};

export default Multi;
