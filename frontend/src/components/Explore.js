import React, { useState } from "react";
import test_video from "./../assets/01.mp4";
const Explore = () => {
  return (
    <div>
      <video width={1080} height={720} autoPlay loop muted>
        <source src={test_video} />
      </video>
      <canvas></canvas>
    </div>
  );
};

export default Explore;
