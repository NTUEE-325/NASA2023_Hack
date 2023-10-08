import React, { useRef, useState, useEffect } from "react";
import {
  Grid,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  Stack,
  Box,
  Button,
  Typography,
} from "@mui/material";
import * as Tone from "tone";
import useInstruments from "./useInstruments";
import {
  piano_note,
  basson_note,
  clarinet_note,
  contrabass_note,
} from "../constant/melody";
import img from "./../assets/image1/1_0100.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

let prevMs = -1;

const Multi = () => {
  const img_names = ["NGC13", "NGC100"];
  const description = [
    "NGC 13 is a spiral galaxy in the constellation Andromeda. It is estimated \
    to be about 220 million light-years (66 Megaparsecs) away from the Sun.\
     It was first discovered on November 26, 1790, by William Herschel.",
    "NGC 100 is a galaxy located approximately 60 million light-years from the Solar System in the constellation Pisces.\
     It has an apparent magnitude of 13.2. It was first discovered on 10 November 1885 by American astronomer Lewis Swift.",
  ];

  const [page, setPage] = useState(0);
  const [imgUrl, setImgUrl] = useState(img);
  const [items, setItems] = useState([
    { name: "channel1", checked: true },
    { name: "channel2", checked: false },
    { name: "channel3", checked: false },
    { name: "channel4", checked: false },
  ]);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // const playNote = (instrument, note, duration, elapsed, now) => {
  //   // note in sharp should be G#4, flat should be in Gb3
  //   instrument.triggerAttack([note], now + elapsed);
  //   instrument.triggerRelease([note], now + elapsed + duration);
  // };

  // console.log(piano_note);
  const incrPage = () => {
    let temp = page;
    if (page < img_names.length - 1) {
      temp += 1;
    }
    setPage(temp);
  };

  const decrPage = () => {
    let temp = page;
    if (page > 0) {
      temp -= 1;
    }
    setPage(temp);
  };

  const tmp_note = [{ pitch: "F4", duration: 1, timing: 0.5, velocity: 1 }];
  const { piano, bassoon, clarinet, contrabass } = useInstruments();

  let count_x = 0;

  Tone.Transport.scheduleOnce((time) => {
    piano_note.forEach((n) => {
      piano.triggerAttackRelease(
        [n.pitch],
        n.duration,
        n.timing + time,
        n.velocity
      );
      // console.log(n);
    });
  }, 0.1);

  Tone.Transport.scheduleOnce((time) => {
    basson_note.forEach((n) => {
      bassoon.triggerAttackRelease(
        [n.pitch],
        n.duration,
        n.timing + time,
        n.velocity
      );
      // console.log(n);
    });
  }, 0.1);

  Tone.Transport.scheduleOnce((time) => {
    clarinet_note.forEach((n) => {
      clarinet.triggerAttackRelease(
        [n.pitch],
        n.duration,
        n.timing + time,
        n.velocity
      );
      // console.log(n);
    });
  }, 0.1);

  Tone.Transport.scheduleOnce((time) => {
    contrabass_note.forEach((n) => {
      contrabass.triggerAttackRelease(
        [n.pitch],
        n.duration,
        n.timing + time,
        n.velocity
      );
      // console.log(n);
    });
  }, 0.1);

  const handleChange = (index) => {
    console.log(items.filter((item) => item.checked === true));
    let temp = items.slice();
    temp[index].checked = !items[index].checked;
    setItems(temp);
  };

  const playTest = () => {
    // polyphonic sampler allows multi sound?
    const now = Tone.now();
    // playNote(piano, "B3", 0.25, 0, now);

    Tone.start();
    Tone.Transport.start();
    animate();
  };

  const drawLine = (ctx, y_min, y_max, x) => {
    ctx.beginPath();
    ctx.moveTo(x, y_min);
    ctx.lineTo(x, y_max);
    ctx.stroke();
    count_x += 1;
  };

  const animate = () => {
    setTimeout(() => {
      const nowMs = Date.now();
      if (prevMs !== nowMs) {
        let canvas = canvasRef.current;
        let image = imageRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        drawLine(ctx, 0, canvas.height, count_x);
        prevMs = nowMs;
        if (count_x === 300) {
          cancelAnimationFrame(animate);
        } else {
          requestAnimationFrame(animate);
        }
      }
    }, 30);
  };

  return (
    <Grid
      container
      sx={{ paddingTop: "18vh", marginLeft: "4vw", marginRight: "4vw" }}
    >
      <Grid item xs={5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(220,220,220,0.2)",
            marginLeft: "10vw",
            marginRight: "10vw",
            paddingLeft: "1vw",
            paddingRight: "1vw",
            paddingTop: "1vh",
            paddingBottom: "1vh",
            color: "rgb(255,255,255)",
            fontSize: 30,
          }}
        >
          <FormGroup>
            <FormControl>
              {items.map((item) => (
                <FormControlLabel
                  key={items.indexOf(item)}
                  control={<Checkbox />}
                  label={item.name}
                  checked={item.checked}
                  onChange={() => {
                    handleChange(items.indexOf(item));
                  }}
                />
              ))}
            </FormControl>
          </FormGroup>
        </Box>
        <Box
          sx={{
            marginLeft: "4vw",
            marginRight: "4vw",
            marginTop: "5vh",
            paddingLeft: "1vw",
            paddingRight: "1vw",
            paddingTop: "1vh",
            paddingBottom: "1vh",
            backgroundColor: "rgba(220,220,220,0.2)",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => {
                decrPage();
              }}
            >
              <ArrowBackIosNewIcon />
            </Button>
            <Stack direction="column">
              <Stack direction="row" spacing={2}>
                <Typography variant="h5" style={{ color: "rgb(255,255,255)" }}>
                  {img_names[page]}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    playTest();
                  }}
                >
                  Play
                </Button>
              </Stack>
              <Typography
                style={{
                  color: "rgb(255,255,255)",
                  fontSize: 22,
                  marginTop: "2vh",
                }}
              >
                {description[page]}
              </Typography>
            </Stack>

            <Button
              onClick={() => {
                incrPage();
              }}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid
        item
        xs={7}
        sx={{
          paddingLeft: "5vw",
          paddingRight: "5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: 500,
            height: 500,
            position: "absolute",
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        ></canvas>
        <img src={imgUrl} ref={imageRef} style={{ display: "none" }} />
      </Grid>
    </Grid>
  );
};

export default Multi;
