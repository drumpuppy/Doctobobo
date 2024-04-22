import React, { useEffect, useState } from "react";
import { styles } from "../css/Signup.styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  let initialFormData = {
    role: "patient",
    Nom: "",
    Prenom: "",
    DateNaissance: null,
    email: "",
    password: "",
    adresse: "",
    code_postal: "",
    Specialite: "",
    description: "",
  };
  const [role, setRole] = React.useState("patient");
  const [formData, setFormData] = useState(initialFormData);
  const [cguAccepted, setCguAccepted] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDate = (value) => {
    if (value) {
      setFormData({ ...formData, DateNaissance: value });
      // console.log(value.toISOString().slice(0, 10));
    }
  };

  const handleSubmit = async () => {
    const {
      role,
      Nom,
      Prenom,
      DateNaissance,
      email,
      password,
      adresse,
      code_postal,
      Specialite,
      description,
    } = formData;
    if (
      !role ||
      !Nom ||
      !Prenom ||
      !DateNaissance ||
      !email ||
      !password ||
      !adresse ||
      !code_postal ||
      (role === "doctor" && (!Specialite || !description))
    ) {
      toast.error("Merci de remplir tous les champs");
      return;
    }
    if (!cguAccepted) {
      toast.error("Veuillez accepter les Conditions Générales d'Utilisation");
      return;
    }
    if (!cookiesAccepted) {
      toast.error("Veuillez accepter les cookies pour continuer.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Address length validation
    if (adresse.length < 5) {
      toast.error("Address must be at least 5 characters long");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    let DateNaissanceFormatted = DateNaissance.toISOString().split("T")[0];
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        Nom,
        Prenom,
        DateNaissanceFormatted,
        email,
        password,
        adresse,
        code_postal,
        Specialite,
        description,
        cguAccepted,
      }),
    });
    const responseData = await response.json();

    console.log(responseData);
    if (responseData.status === true) {
      toast.success("Signup Successfull");
      navigate("/Login");
      return;
    }
    toast.error("L'Utilisateur existe déjà");
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <Box sx={styles.mainScreen}>
      <Box sx={styles.SignupBox}>
        <Typography sx={styles.font}>Nouveau sur Doctobobo ?</Typography>
        <Grid container rowSpacing={3} columnSpacing={4}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Nom"
              name="Nom"
              value={formData.Nom}
              onChange={handleForm}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Prenom"
              name="Prenom"
              value={formData.Prenom}
              onChange={handleForm}
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  ".MuiTextField-root": {
                    width: "100%",
                  },
                }}
              >
                <DatePicker
                  label="Date de naissance"
                  name="DateNaissance"
                  fullWidth
                  value={formData.DateNaissance}
                  onChange={(newValue) => handleDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleForm}
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Code postal"
              name="code_postal"
              type="number"
              value={formData.code_postal}
              onChange={handleForm}
              fullWidth
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="password"
              label="Mot de passe "
              name="password"
              value={formData.password}
              onChange={handleForm}
              fullWidth
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                name="role"
                onChange={handleChange}
              >
                <MenuItem value={"doctor"}>Docteur</MenuItem>
                <MenuItem value={"patient"}>Patient</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {role === "doctor" ? (
            <>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="Specialite"
                  value={formData.Specialite}
                  onChange={handleForm}
                  label="Spécialité"
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={formData.description}
                  onChange={handleForm}
                  name="description"
                  label="Description"
                  fullWidth
                />
              </Grid>
            </>
          ) : (
            ""
          )}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              control={
                <Radio
                  checked={cguAccepted}
                  onChange={(e) => setCguAccepted(e.target.checked)}
                  value="oui"
                  name="cgu"
                  inputProps={{ 'aria-label': 'A' }}
                />
              }
              label="J'accepte les Conditions Générales d'Utilisation"
            />
            <Typography sx={{ mt: 1 }}>
              <a href={`${process.env.PUBLIC_URL}/CGU doctobobo.pdf`} download="Conditions_Generales_d_Utilisation.pdf" style={{ textDecoration: 'none' }}>
                Télécharger les CGU
              </a>
            </Typography>
            <FormControlLabel
              control={
                <Radio
                  checked={cookiesAccepted}
                  onChange={(e) => setCookiesAccepted(e.target.checked)}
                  value="oui"
                  name="cookies"
                />
              }
              label="J'accepte l'utilisation des cookies"
            />

          </Grid>
        </Grid>

        <Button sx={styles.btn} onClick={handleSubmit}>
          S'inscrire
        </Button>
        <Box sx={styles.flex}>
          <Typography sx={{ fontFamily: "'Poppins'" }}>
            Vous avez déjà un compte ?
          </Typography>
          <Box onClick={() => navigate("/Login")}>
            <Typography sx={styles.logIn}>Se connecter</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;