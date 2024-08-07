import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { style } from "./styles";
import axios from "axios";

function AddHero(props: MyCodeParams) {
  const [hero, setHero] = useState<hero>({
    Name: "",
    FirstName: "",
    LastName: "",
    Place: "",
    imgSrc: "",
  });

  const handleChange = (e) => {
    setHero((oldValues) => {
      return { ...oldValues, [e.target.id]: e.target.value };
    });
  };

  const resetHero = () => {
    setHero({
      Name: "",
      FirstName: "",
      LastName: "",
      Place: "",
      imgSrc: "",
    });
  };

  const handleSubmit = () => {
    const addHero = async () => {
      console.log(hero);
      await axios
        .post(`${process.env.REACT_APP_API_URL_ENPOINT}/api/SuperHero`, hero)
        .then(
          (response) => {
            props.onClose();
          },
          (error) => {
            alert(error);
            props.onClose();
          }
        );
    };

    addHero();
  };
  return (
    <Box sx={style}>
      <Grid container>
        <Grid xs={12}>
          <TextField
            id="Name"
            label="Hero Name"
            variant="standard"
            value={hero.Name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            id="FirstName"
            label="First Name"
            variant="standard"
            value={hero.FirstName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            id="LastName"
            label="Last Name"
            variant="standard"
            value={hero.LastName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            id="Place"
            label="City"
            variant="standard"
            value={hero.Place}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            id="imgSrc"
            label="Image Link"
            variant="standard"
            value={hero.imgSrc}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid xs={6} className="form-buttons">
          <Button variant="outlined" onClick={resetHero}>
            Clear
          </Button>
        </Grid>
        <Grid xs={6} className="form-buttons">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

interface hero {
  Name: String;
  FirstName: String;
  LastName: String;
  Place: String;
  imgSrc: String;
}

interface MyCodeParams {
  onClose: () => void;
}

export default AddHero;
