import React, { useContext, useEffect, useState } from "react";
import { styles } from "../css/Signup.styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  let initialFormData = {
    role: "",
    email: "",
    password: "",
  };
  const [role, setRole] = React.useState("");
  const [formData, setFormData] = useState(initialFormData);
  const { setUser, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const {
      role,

      email,
      password,
    } = formData;
    if (!email || !password || !role) {
      toast.error("Merci de remplir tous les champs");
      return;
    }

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,

        email,
        password,
      }),
    });
    const responseData = await response.json();

    console.log(responseData);
    if (responseData.status === 404) {
      toast.error("L'Utilisateur inconnu");
    } else if (responseData.status === 401) {
      toast.error("Invalid Credentials");
    } else if (responseData.status === 200) {
      toast.success("Connexion réussi");
      setUser(true);
      setUserData({ user: responseData?.data?.user, role: role });
      navigate("/");
    }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <Box sx={styles.mainScreen}>
      <Box sx={styles.LoginBox}>
      <Typography sx={{ ...styles.font, textAlign: "center" }}>
          J'ai déjà un compte Doctobobo
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={4}>
          <Grid item xs={12} lg={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleForm}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="password"
              label="Mot de passe"
              name="password"
              value={formData.password}
              onChange={handleForm}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {" "}
                Selectionner un rôle
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Choisir votre rôle"
                name="role"
                onChange={handleChange}
              >
                <MenuItem value={"doctor"}>Docteur</MenuItem>
                <MenuItem value={"patient"}>Patient</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button sx={styles.btn} onClick={handleSubmit}>
          Se connecter
        </Button>
        <Box sx={styles.flex}>
          <Typography sx={{ fontFamily: "'Poppins'" }}>
            Vous n'avez pas encore de compte ?
          </Typography>
          <Box onClick={() => navigate("/Signup")}>
            <Typography sx={styles.logIn}>S'inscrire</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
