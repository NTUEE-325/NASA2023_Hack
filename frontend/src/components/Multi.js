import React, { useEffect, useState } from "react";
import {
  Grid,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import * as Tone from "tone";
import useInstruments from "./useInstruments";

const Multi = () => {
  const { piano, bassoon, clarinet, contrabass } = useInstruments();
  const [items, setItems] = useState([
    { name: "channel1", checked: true },
    { name: "channel2", checked: false },
    { name: "channel3", checked: false },
    { name: "channel4", checked: false },
  ]);

  // const playNote = (instrument, note, duration, elapsed, now) => {
  //   // note in sharp should be G#4, flat should be in Gb3
  //   instrument.triggerAttack([note], now + elapsed);
  //   instrument.triggerRelease([note], now + elapsed + duration);
  // };

  // Tone.Transport.scheduleOnce((time) => {
  //   pianoNotes.forEach((n) => {
  //     piano.triggerAttackRelease(
  //       [n.pitch],
  //       n.duration,
  //       n.timing + time,
  //       n.velocity
  //     );
  //   });
  // }, 4);

  const handleChange = (index) => {
    // console.log(items.filter((item) => item.checked === true));
    let temp = items.slice();
    temp[index].checked = !items[index].checked;
    setItems(temp);
  };

  const playTest = () => {
    // polyphonic sampler allows multi sound?
    // const now = Tone.now();
    // playNote(piano, "B3", 0.25, 0, now);
    // Tone.Transport;
  };

  return (
    <Grid container sx={{ paddingTop: "18vh" }}>
      <Grid item xs={3}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(220,220,220,0.1)",
            marginLeft: "5vw",
            marginRight: "5vw",
            color: "rgb(255,255,255)",
            fontSize: 30,
          }}
        >
          <FormGroup>
            <FormControl>
              {items.map((item) => (
                <FormControlLabel
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
      </Grid>
      <Grid
        item
        xs={9}
        sx={{
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <Button
          onClick={() => {
            playTest();
          }}
        >
          Play
        </Button>
      </Grid>
    </Grid>
  );
};

export default Multi;
