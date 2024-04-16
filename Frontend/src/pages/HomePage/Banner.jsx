import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import image from "../../assets/doc.png";
import Search from "../../Components/Search";

const styles = {
  main: {
    fontFamily: "'poppins'",
    background: "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    color: "white",
    fontSize: "15px",
    width: "100%",
  },
  cont: {
    paddingTop: "100px",
    maxWidth: { lg: "1500px" },
  },
  image: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  font: {
    fontFamily: "'poppins'",
    color: "white",
    fontSize: { md: "30px", xs: "20px" },
    fontWeight: 500,
    textAlign: { md: "left", xs: "center" },
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: { md: "start", xs: "center" },
    justifyContent: { md: "start", xs: "center" },
    width: "100%",
  },
};

const Banner = ({ search, handleChange, handleChangePostalCode }) => {
  return (
    <Box sx={styles.main}>
      <Container sx={styles.cont}>
        <Grid container display={"flex"} alignItems={"center"}>
          <Grid item lg={7} xs={12}>
            <Box sx={styles.flex}>
              <Typography sx={styles.font}>
                Bienvenue sur Doctobobo, la plateforme qui met en relation professionnels de santé et patients ! 
              </Typography>
              <Search search={search} handleChange={handleChange} handleChangePostalCode={handleChangePostalCode} />
            </Box>
          </Grid>
          <Grid item lg={5} xs={12}>
            <Box sx={styles.image}>
              <img src={image} alt="doctor" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};


export default Banner;
