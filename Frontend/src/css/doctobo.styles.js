import steImage from "../assets/ste.png";

export const styles = {
  main: {
    marginTop: "60px",
    padding: "20px",
    width: "100%",
    position: "relative",
  },
  cont: {
    paddingTop: "50px",
    maxWidth: { lg: "1500px" },
  },
  font: {
    fontFamily: "'poppins'",
    color: "black",
    fontSize: "30px",
    fontWeight: 600,
    textAlign: "center",
  },
  flex: {
    display: "flex",
    flexDirection: "column",
  },
  boxy: {
    marginTop: "40px",
  },
  // Style pour l'arrière-plan avec l'image ste.png
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${steImage})`,
    backgroundRepeat: "repeat",
    zIndex: -1,
  },
  doctorPageStyles: {
    mainContainer: {
      position: "relative",
      padding: "20px",
    },
    title: {
      fontFamily: "'poppins'",
      fontSize: "30px",
      fontWeight: 600,
      textAlign: "center",
      marginTop: "50px",
    },
    doctorsContainer: {
      marginTop: "40px",
    },
  },
};
