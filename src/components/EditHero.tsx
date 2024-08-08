import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { editHeroStyle, style } from "./styles";
import axios from "axios";

function EditHero(props: MyCodeParams) {
  const [hero, setHero] = useState<hero>({
    Name: "",
    FirstName: "",
    LastName: "",
    Place: "",
    imgSrc: "",
  });

  const [isLoading, setisLoading] = useState(false);

  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    //Get super hero data
    const loadPost = async () => {
      setisLoading(true);
      // const response = await axios.get(
      //   `http://localhost:5258/api/SuperHero/${props.id}`
      // );

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_ENPOINT}/api/SuperHero/${props.id}`
      );

      console.log(response.data);
      setHero(response.data);
      setImageLink(response?.data?.imgSrc);
      setisLoading(false);
    };

    loadPost();
  }, []);

  const handleChange = (e) => {
    setHero((oldValues) => {
      return { ...oldValues, [e.target.id]: e.target.value };
    });
  };

  const deleteHero = () => {
    const removeHero = async () => {
      await axios
        .delete(
          `${process.env.REACT_APP_API_URL_ENPOINT}/api/SuperHero/${props.id}`
        )
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

    removeHero();
  };

  const handleSubmit = () => {
    const addHero = async () => {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL_ENPOINT}/api/SuperHero/${props.id}`,
          hero
        )
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
    <Box sx={editHeroStyle}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            component="img"
            src={imageLink}
            sx={{
              width: "100%",
              maxWidth: 500, // Maximum width the image can take
              height: "auto", // Maintain aspect ratio
              "@media (max-width:600px)": {
                maxWidth: 300, // Smaller width on smaller screens
              },
              "@media (max-width:400px)": {
                maxWidth: 200, // Even smaller on very small screens
              },
            }}
          />
          <Grid
            container
            style={{
              marginTop: "5%",
            }}
          >
            <Grid xs={12}>
              <TextField
                id="Name"
                label="Hero Name"
                variant="standard"
                value={hero.Name}
                onChange={handleChange}
                fullWidth={true}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="FirstName"
                label="First Name"
                variant="standard"
                value={hero.FirstName}
                onChange={handleChange}
                fullWidth={true}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="LastName"
                label="Last Name"
                variant="standard"
                value={hero.LastName}
                onChange={handleChange}
                fullWidth={true}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="Place"
                label="City"
                variant="standard"
                value={hero.Place}
                onChange={handleChange}
                fullWidth={true}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="imgSrc"
                label="Image Link"
                variant="standard"
                value={hero.imgSrc}
                onChange={handleChange}
                fullWidth={true}
              />
            </Grid>
            <Grid xs={6} className="form-buttons">
              <Button variant="contained" onClick={deleteHero} color="error">
                Delete
              </Button>
            </Grid>
            <Grid xs={6} className="form-buttons">
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

interface hero {
  Name: String;
  FirstName: String;
  LastName: String;
  Place: String;
  imgSrc: string;
}

interface MyCodeParams {
  id: String;
  onClose: () => void;
}

export default EditHero;
