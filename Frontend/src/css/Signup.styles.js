export const styles = {
  mainScreen: {
    minHeight: "100vh",
    paddingY: "3rem",
    width: "100%",

    background:
      "linear-gradient(180deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  SignupBox: {
    paddingY: "40px",
    paddingX: "30px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "40%" },
    borderRadius: "7px",
    boxShadow: 3,
  },
  LoginBox: {
    paddingY: "40px",
    paddingX: "30px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "20%" },
    borderRadius: "7px",
    boxShadow: 3,
  },

  font: {
    fontFamily: "'poppins'",
    color: "black",
    fontSize: "30px",
    marginBottom: "30px",
    fontWeight: 600,
  },
  btn: {
    fontFamily: "'poppins'",
    width: "100%",
    background:
      "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    color: "white",
    paddingY: "10px",
    fontSize: "15px",
  },
  flex: {
    display: "flex",
    gap: "5px",
    fontFamily: "'poppins'",
  },

  logIn: {
    fontFamily: "'poppins'",
    color: "rgb(5,117,230,1)",
    fontWeight: 600,
    cursor: "pointer",
  },
};
