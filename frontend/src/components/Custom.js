import React, { useState } from "react";
import instance from "./api";
import { Box, Typography } from "@mui/material";

const Custom = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  // const handleSubmit = async (e) => {
  //   let formData = new FormData();
  //   formData.append("data", selectedFile);
  //   console.log(formData);
  //   const response = await instance.post("/upload", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  //   console.log(response);
  // };
  // const handleSelect = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  return (
    // <Box
    //   sx={{
    //     backgroundColor: "rgb(255,255,255)",
    //     width: "20vw",
    //     height: "10vh",
    //   }}
    // >
    //   <form onSubmit={handleSubmit}>
    //     <input type="file" onChange={handleSelect} />
    //     <input type="submit" value="Upload File" />
    //   </form>
    // </Box>
    <Typography>To be done...</Typography>
  );
};

export default Custom;
