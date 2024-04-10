import { Box, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
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
  link: {
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  linkHovered: {
    color: "yellow",
  },
};

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, setUserData } = useContext(AuthContext);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

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
        <Box
          onClick={() => navigate("/Dashboard")}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          <Typography
            sx={{
              ...styles.typo,
              ...(isMenuHovered && styles.linkHovered),
              ...styles.link,
            }}
          >
            Menu
          </Typography>
        </Box>

        {user ? (
          <Box
            onClick={handleLogout}
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
          >
            <Typography
              sx={{
                ...styles.typo,
                ...(isLoginHovered && styles.linkHovered),
                ...styles.link,
              }}
            >
              Se déconnecter
            </Typography>
          </Box>
        ) : (
          <Box
            onClick={() => navigate("/Login")}
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
          >
            <Typography
              sx={{
                ...styles.typo,
                ...(isLoginHovered && styles.linkHovered),
                ...styles.link,
              }}
            >
              Connexion/Inscription
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Header;
