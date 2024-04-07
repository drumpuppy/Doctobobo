import { Box, Container, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
const styles = {
  main: {
    width: "100%",

    position: "absolute",
    paddingY: "20px",
    top: 0,
  },
  cont: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: { lg: "1400px" },
  },
  typo: {
    fontFamily: "'poppins'",
    fontWeight: 600,
    color: "white",

    fontSize: "25px",
  },
};
const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, setUserData } = useContext(AuthContext);
  const handleLogout = () => {
    setUser(false);
    setUserData({});
  };
  useEffect(() => {
    console.log(user, "user");
  }, [user]);
  return (
    <Box sx={styles.main}>
      <Container sx={styles.cont}>
        <Box onClick={() => navigate("/Dashboard")} sx={{ cursor: "pointer" }}>
          <Typography sx={styles.typo}>Dashboard</Typography>
        </Box>

        {user ? (
          <>
            <Box onClick={() => handleLogout()} sx={{ cursor: "pointer" }}>
              <Typography sx={styles.typo}>Logout</Typography>
            </Box>
          </>
        ) : (
          <>
            <Box onClick={() => navigate("/Login")} sx={{ cursor: "pointer" }}>
              <Typography sx={styles.typo}>Login/Register</Typography>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Header;
