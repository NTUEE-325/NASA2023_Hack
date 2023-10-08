import React, { useRef, useState, useEffect, useContext } from "react";
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
// import useInstruments from "./useInstruments";
import InstrumentContext from "./useInstruments";
import {
  piano_note_1,
  basson_note_1,
  clarinet_note_1,
  contrabass_note_1,
} from "../constant/melody1";
import {
  piano_note_2,
  basson_note_2,
  clarinet_note_2,
  contrabass_note_2,
} from "../constant/melody2";
import {
  piano_note_3,
  basson_note_3,
  clarinet_note_3,
  contrabass_note_3,
} from "../constant/melody3";

/* File generated automatically by python. */
import pic_1_0000 from "./../assets/image1/1_0000.jpg";
import pic_1_0001 from "./../assets/image1/1_0001.jpg";
import pic_1_0010 from "./../assets/image1/1_0010.jpg";
import pic_1_0011 from "./../assets/image1/1_0011.jpg";
import pic_1_0100 from "./../assets/image1/1_0100.jpg";
import pic_1_0101 from "./../assets/image1/1_0101.jpg";
import pic_1_0110 from "./../assets/image1/1_0110.jpg";
import pic_1_0111 from "./../assets/image1/1_0111.jpg";
import pic_1_1000 from "./../assets/image1/1_1000.jpg";
import pic_1_1001 from "./../assets/image1/1_1001.jpg";
import pic_1_1010 from "./../assets/image1/1_1010.jpg";
import pic_1_1011 from "./../assets/image1/1_1011.jpg";
import pic_1_1100 from "./../assets/image1/1_1100.jpg";
import pic_1_1101 from "./../assets/image1/1_1101.jpg";
import pic_1_1110 from "./../assets/image1/1_1110.jpg";
import pic_1_1111 from "./../assets/image1/1_1111.jpg";
import pic_5_0000 from "./../assets/image5/5_0000.jpg";
import pic_5_0001 from "./../assets/image5/5_0001.jpg";
import pic_5_0010 from "./../assets/image5/5_0010.jpg";
import pic_5_0011 from "./../assets/image5/5_0011.jpg";
import pic_5_0100 from "./../assets/image5/5_0100.jpg";
import pic_5_0101 from "./../assets/image5/5_0101.jpg";
import pic_5_0110 from "./../assets/image5/5_0110.jpg";
import pic_5_0111 from "./../assets/image5/5_0111.jpg";
import pic_5_1000 from "./../assets/image5/5_1000.jpg";
import pic_5_1001 from "./../assets/image5/5_1001.jpg";
import pic_5_1010 from "./../assets/image5/5_1010.jpg";
import pic_5_1011 from "./../assets/image5/5_1011.jpg";
import pic_5_1100 from "./../assets/image5/5_1100.jpg";
import pic_5_1101 from "./../assets/image5/5_1101.jpg";
import pic_5_1110 from "./../assets/image5/5_1110.jpg";
import pic_5_1111 from "./../assets/image5/5_1111.jpg";
import pic_6_0000 from "./../assets/image6/6_0000.jpg";
import pic_6_0001 from "./../assets/image6/6_0001.jpg";
import pic_6_0010 from "./../assets/image6/6_0010.jpg";
import pic_6_0011 from "./../assets/image6/6_0011.jpg";
import pic_6_0100 from "./../assets/image6/6_0100.jpg";
import pic_6_0101 from "./../assets/image6/6_0101.jpg";
import pic_6_0110 from "./../assets/image6/6_0110.jpg";
import pic_6_0111 from "./../assets/image6/6_0111.jpg";
import pic_6_1000 from "./../assets/image6/6_1000.jpg";
import pic_6_1001 from "./../assets/image6/6_1001.jpg";
import pic_6_1010 from "./../assets/image6/6_1010.jpg";
import pic_6_1011 from "./../assets/image6/6_1011.jpg";
import pic_6_1100 from "./../assets/image6/6_1100.jpg";
import pic_6_1101 from "./../assets/image6/6_1101.jpg";
import pic_6_1110 from "./../assets/image6/6_1110.jpg";
import pic_6_1111 from "./../assets/image6/6_1111.jpg";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

let prevMs = -1;

const Multi = () => {
  const img_names = ["NGC13", "NGC100", "NGC30"];
  const arr = [1, 5, 6];
  const description = [
    "NGC 13 is a spiral galaxy in the constellation Andromeda. It is estimated \
    to be about 220 million light-years (66 Megaparsecs) away from the Sun.\
     It was first discovered on November 26, 1790, by William Herschel.",
    "NGC 100 is a galaxy located approximately 60 million light-years from the Solar System in the constellation Pisces.\
     It has an apparent magnitude of 13.2. It was first discovered on 10 November 1885 by American astronomer Lewis Swift.",
    "NGC 30 is a Double Star in the Pegasus constellation. NGC 30 is situated close to the celestial equator and, as such,\
      it is at least partly visible from both hemispheres in certain times of the year.",
  ];

  const [page, setPage] = useState(0);
  const [disable, setDisable] = useState(false);
  const [items, setItems] = useState([
    { name: "wavelength: 3.4um", checked: true },
    { name: "wavelength: 4.6um", checked: false },
    { name: "wavelength: 12um", checked: false },
    { name: "wavelength: 22um", checked: false },
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
  // const { piano, bassoon, clarinet, contrabass } = useInstruments();
  const { piano, bassoon, clarinet, contrabass } =
    useContext(InstrumentContext);

  let count_x = 0;
  let reqID = null;

  // Tone.Transport.scheduleRepeat((time) => {
  //   piano_note.forEach((n) => {
  //     piano.triggerAttackRelease(
  //       [n.pitch],
  //       n.duration,
  //       n.timing + time,
  //       n.velocity
  //     );
  //     // console.log(n);
  //   });
  // }, 10);

  // Tone.Transport.scheduleRepeat((time) => {
  //   basson_note.forEach((n) => {
  //     bassoon.triggerAttackRelease(
  //       [n.pitch],
  //       n.duration,
  //       n.timing + time,
  //       n.velocity
  //     );
  //     // console.log(n);
  //   });
  // }, 10);

  // Tone.Transport.scheduleRepeat((time) => {
  //   clarinet_note.forEach((n) => {
  //     clarinet.triggerAttackRelease(
  //       [n.pitch],
  //       n.duration,
  //       n.timing + time,
  //       n.velocity
  //     );
  //     // console.log(n);
  //   });
  // }, 10);

  // Tone.Transport.scheduleRepeat((time) => {
  //   contrabass_note.forEach((n) => {
  //     contrabass.triggerAttackRelease(
  //       [n.pitch],
  //       n.duration,
  //       n.timing + time,
  //       n.velocity
  //     );
  //     // console.log(n);
  //   });
  // }, 10);

  const handleChange = (index) => {
    let temp = items.slice();
    temp[index].checked = !items[index].checked;
    setItems(temp);
  };

  const playTest = () => {
    // polyphonic sampler allows multi sound?
    Tone.start();
    let now = Tone.now();
    // playNote(piano, "B3", 0.25, 0, now);

    // Tone.start();
    
    let piano_note, basson_note, clarinet_note, contrabass_note;
    if (page===0){
      piano_note = piano_note_1;
      basson_note = basson_note_1;
      clarinet_note = clarinet_note_1;
      contrabass_note = contrabass_note_1; 
    } else if (page===1){
      piano_note = piano_note_2;
      basson_note = basson_note_2;
      clarinet_note = clarinet_note_2;
      contrabass_note = contrabass_note_2; 
    } else {
      piano_note = piano_note_3;
      basson_note = basson_note_3;
      clarinet_note = clarinet_note_3;
      contrabass_note = contrabass_note_3; 
    }

    let result = items.map((a) => a.checked);

    if (result[0]) {
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
      });
    }

    if (result[2]) {
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
      });
    }

    if (result[1]) {
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
      });
    }

    if (result[3]) {
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
      });
    }

    console.log(result);

    // Tone.start();
    if (result[0] | result[1] | result[2] | result[3]) {
      Tone.Transport.start();
    }

    animate();
    setDisable(true);
    setTimeout(() => {
      setDisable(false);
    }, 10000);
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
        ctx.strokeStyle = "white";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        drawLine(ctx, 0, canvas.height, count_x);
        prevMs = nowMs;
        if (count_x === 300) {
          reqID = cancelAnimationFrame(animate);
          count_x = 0;
        } else {
          reqID = requestAnimationFrame(animate);
        }
      }
    }, 30);
  };

  useEffect(() => {
    //change imgUrl
    let result = items.map((a) => a.checked);
    let image = imageRef.current;
    let canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (image !== null) {
      if (page === 0) {
        if (result[0] === false) {
          if (result[1] === false) {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_1_0000);
              } else {
                image.setAttribute("src", pic_1_0001);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_1_0010);
              } else {
                image.setAttribute("src", pic_1_0011);
              }
            }
          } else {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_1_0100);
              } else {
                image.setAttribute("src", pic_1_0101);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_1_0110);
              } else {
                image.setAttribute("src", pic_1_0111);
              }
            }
          }
        } else {
          if (result[1] === false) {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_1_1000);
              } else {
                image.setAttribute("src", pic_1_1001);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_1_1010);
              } else {
                image.setAttribute("src", pic_1_1011);
              }
            }
          } else {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_1_1100);
              } else {
                image.setAttribute("src", pic_1_1101);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_1_1110);
              } else {
                image.setAttribute("src", pic_1_1111);
              }
            }
          }
        }
      } else if (page === 1) {
        if (result[0] === false) {
          if (result[1] === false) {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_5_0000);
              } else {
                image.setAttribute("src", pic_5_0001);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_5_0010);
              } else {
                image.setAttribute("src", pic_5_0011);
              }
            }
          } else {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_5_0100);
              } else {
                image.setAttribute("src", pic_5_0101);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_5_0110);
              } else {
                image.setAttribute("src", pic_5_0111);
              }
            }
          }
        } else {
          if (result[1] === false) {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_5_1000);
              } else {
                image.setAttribute("src", pic_5_1001);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_5_1010);
              } else {
                image.setAttribute("src", pic_5_1011);
              }
            }
          } else {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_5_1100);
              } else {
                image.setAttribute("src", pic_5_1101);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_5_1110);
              } else {
                image.setAttribute("src", pic_5_1111);
              }
            }
          }
        }
      } else {
        if (result[0] === false) {
          if (result[1] === false) {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_6_0000);
              } else {
                image.setAttribute("src", pic_6_0001);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_6_0010);
              } else {
                image.setAttribute("src", pic_6_0011);
              }
            }
          } else {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_6_0100);
              } else {
                image.setAttribute("src", pic_6_0101);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_6_0110);
              } else {
                image.setAttribute("src", pic_6_0111);
              }
            }
          }
        } else {
          if (result[1] === false) {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_6_1000);
              } else {
                image.setAttribute("src", pic_6_1001);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_6_1010);
              } else {
                image.setAttribute("src", pic_6_1011);
              }
            }
          } else {
            if (result[2] === false) {
              if (result[3] === false) {
                image.setAttribute("src", pic_6_1100);
              } else {
                image.setAttribute("src", pic_6_1101);
              }
            } else {
              if (result[3] === false) {
                image.setAttribute("src", pic_6_1110);
              } else {
                image.setAttribute("src", pic_6_1111);
              }
            }
          }
        }
      }
    }
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [items, page]);

  useEffect(() => {
    let image = imageRef.current;
    let canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return () => {
      window.cancelAnimationFrame(reqID);
    };
  }, []);

  return (
    <Grid
      container
      sx={{ paddingTop: "18vh", paddingLeft: "4vw", paddingRight: "4vw" }}
    >
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(220,220,220,0.2)",
            marginLeft: "4vw",
            marginRight: "4vw",
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
                  disabled={disable}
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
              disabled={page === 0}
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
                  disabled={disable}
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
              disabled={page === 2}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
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
        <img src={pic_1_1000} ref={imageRef} style={{ display: "none" }} />
      </Grid>
    </Grid>
  );
};

export default Multi;
