import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import AddHero from "./AddHero.tsx";
import EditHero from "./EditHero.tsx";

function HeroList() {
  const [heroes, setHeroes] = useState<IUser>();

  //Used for add hero modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setisLoading] = useState(false);

  const [heroID, setHeroID] = useState("");

  const [openEditHero, setOpenEditHero] = useState(false);
  const handleOpenEditHero = (id) => {
    setHeroID(id);
    setOpenEditHero(true);
  };
  const handleCloseEditHero = () => setOpenEditHero(false);

  //Fetches Super Hero List
  useEffect(() => {
    const loadPost = async () => {
      setisLoading(true);
      //const response = await axios.get("http://localhost:5258/api/SuperHero");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_ENPOINT}`
      );
      console.log(response.data);
      setHeroes(response.data);
      setisLoading(false);
    };
    if (!openEditHero && !open) {
      loadPost();
    }
  }, [open, openEditHero]);

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {heroes?.map((hero) => (
            <Grid xs={3}>
              <Card
                sx={{ maxWidth: 345 }}
                raised={true}
                style={{ backgroundColor: "#8e8e8e", color: "white" }}
              >
                <CardActionArea onClick={() => handleOpenEditHero(hero._id)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={hero.imgSrc}
                    alt="hero image"
                    sx={{
                      objectFit: "cover", // Ensures the image covers the area
                      objectPosition: "top", // Aligns the image to the top
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {hero.Name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          <Grid xs={2}>
            <Button onClick={handleOpen} variant="contained">
              Add Hero
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddHero onClose={handleClose} />
            </Modal>
          </Grid>
          <Modal open={openEditHero} onClose={handleCloseEditHero}>
            <EditHero onClose={handleCloseEditHero} id={heroID} />
          </Modal>
        </Grid>
      )}
    </>
  );
}

interface IUser {
  map(arg0: (x: any) => React.JSX.Element): React.ReactNode;
  _id: String;
  Name: String;
  firstName: String;
  lastName: String;
  place: String;
  imgSrc: String;
}

export default HeroList;
