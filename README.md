# NASA2023_Hack

## Run locally

- install NVM, npm
- install nodejs (we try 20.4.0, 14.7.0)
 
```bash
cd frontend
npm install
npm run start
```

## Multi-channel Image Processing

- put your downloaded .fits file from (https://irsa.ipac.caltech.edu/applications/wise/?__action=layout.showDropDown&) as the format in MultiChannel


## Summary
We provided an open-source web application to revolutionize the way users interact with various forms of 3D data, such as fly-through videos and multi-channel images. In the case of video, we calculated the viewer's trajectory and enhances the audio experience accordingly. For multi-channel image, we ensembled features from different channels and allows the audience to choose their preferred channel for auditory exploration. Our results not only showcase the effectiveness of these techniques but also open up new possibilities for immersive, personalized auditory experiences.

## Project Details
We adopt the following strategy to realize the sonification of 3D data:

> Fly-through video
1. We integrate the **Optical flow** method in OpenCV.js in real-time to track the viewer's movement within the video.
2. From the movement of the viewer, we utilize **Panner3D** in tone.js to position audio tracks in a three-dimensional space around the viewer. This spatialization adds depth and realism to the auditory experience.
3. Sound sources are triggered when a celestial object, such as a star, interacts with an imaginary equidistant surface surrounding the viewer.

> Multi-channel Image
1. We preprocessed the data in **log-scale** and filtered out unnecessary noise. This ensures a smoother and more consistent intensity across the audio channels.
2. We choose musical instruments that complement the characteristics of different wavelengths. Sharp instruments are employed for shorter wavelengths, while deeper and resonant instruments are used for longer wavelengths. This selection enriches the timbral variety in the sonification.
3. We scan through the picture in the horizontal direction, and the position of stars are encoded into distinct frequencies within the audio spectrum.
To produce pleasant sounds instead of sine wave, we use the **Sampler** in tone.js to create sound from instruments.

Our project serves as a solution for sonifying 3D data, with a particular emphasis on enhancing accessibility for visually impaired individuals and scientists seeking new ways to explore and interpret such data.

The entire project is developed using React and is hosted on render.com.
