# NASA2023_Hack

## Summary
We provided an open-source web application to revolutionize the way users interact with various forms of 3D data, such as fly-through videos and multi-channel images. In the case of video, we calculated the viewer's trajectory and enhances the audio experience accordingly. For multi-channel image, we ensembled features from different channels and allows the audience to choose their preferred channel for auditory exploration. Our results not only showcase the effectiveness of these techniques but also open up new possibilities for immersive, personalized auditory experiences.

## Project Details

We adopt the following strategy to realize the sonification of 3D data:

Fly-through video


1. We integrate the *Lucas-Kanade Optical flow* method in OpenCV to track the viewer's movement within the video. *Contour detection* is used to identify the celestial objects and provide the reference for optical flow.
2. From the movement of the viewer, we utilize *Panner3D* in tone.js to position audio tracks in a three-dimensional space around the viewer. For instance, if the viewer is turning clockwise, then the sound source corresponds by turning counterclockwise, and vice versa. This spatialization adds depth and realism to the auditory experience.
3. Sound sources are triggered when a celestial object, such as a star, interacts with an imaginary equidistant surface surrounding the viewer. We map the color of the starlight to different instruments, treating them as discrete data. For continuous data like brightness and position of the stars, we map them to sound volume and frequency, respectively.
   
[Note] For better audio experience, please wear earphones for the sonification.

Multi-channel Image


1. We preprocess the WISE data in *log-scale* and filtered out unnecessary noise. This ensures a smoother and more consistent intensity across the audio channels.
2. We choose musical instruments that complement the characteristics of different wavelengths. Sharp instruments are employed for shorter wavelengths, while deeper and resonant instruments are used for longer wavelengths. This selection enriches the timbral variety.
3. We scan through the picture in the horizontal direction, and the position of stars and galaxies are encoded into distinct frequencies within the audio spectrum.
4. We also provide a visualization of high dimensional data through color.

To produce pleasant sounds instead of sine wave, we use the *Sampler* in tone.js to create sound from instruments.





Our project serves as a solution for sonifying 3D data, with a particular emphasis on enhancing accessibility for scientists and visually impaired individuals seeking new ways to explore and interpret such data.

The entire project is developed using React and is hosted on render.com.


We adopt the following strategy to realize the sonification of 3D data:

## Run locally

- install NVM, npm
- install nodejs (we try 20.4.0, 14.7.0)
- clone the repo

cd frontend
npm install
npm run start

## Multi-channel Image Processing

### .fits data to tone.js composable information
- put your downloaded .fits file from [link](https://irsa.ipac.caltech.edu/applications/wise/?__action=layout.showDropDown&) as the format in MultiChannel
```
├── MultiChannel
│   ├── folder_path
│   │   ├── w*.fits
```

```bash
cd MultiChannel
python image_processing.py folder_path
```

change the output path if you want

### .fits data visualization
```bash
python Fits2pandas.py
```
change the input and output path if you want

## Optical flow detection

### Contour detection & Optical flow detection

- Contour detection is used to pick out the celestic objects, such as stars, to provide the reference for optical flow detection later on.
- The estimated optical flow is used to evaluate the average velocity field of the stars, and therefore we can extract the movement of the view.
- We further pass the information of movement, written in direction.js, to the frontend such that the frontend can adjust the listener's position. Therefore, the auditor can sense the change of audio source position.

### directions.js generation

- directions.js can be generated from OpticalFlow/direction.ipynb. Substitute the video_path.mp4 file and execute all cells. The file will be saved in OpticalFlow/ directory.