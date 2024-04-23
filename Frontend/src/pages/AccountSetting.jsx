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

import Select from "@mui/material/Select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { styles } from "../css/accountSetting.styles";
import { AuthContext } from "../Context/AuthContext";
const AccountSetting = () => {
  const { setUser, setUserData, userData } = useContext(AuthContext);
  console.log(userData, "ud");
  let initialFormDataPatient = {
    role: userData.role,
    Nom_Patient: userData?.user?.Nom_Patient,
    Prenom_Patient: userData?.user?.Prenom_Patient,
    DateNaissance: userData?.user?.DateNaissance,
    email: userData?.user?.email,

    adresse: userData?.user?.adresse,
    code_postal: userData?.user?.code_postal,
  };
  let initialFormDataMedicine = {
    role: userData.role,
    Nom_Medecin: userData?.user?.Nom_Medecin,
    Prenom_Medecin: userData?.user?.Prenom_Medecin,
    DateNaissance: userData?.user?.DateNaissance,
    email: userData?.user?.email,

    adresse: userData?.user?.adresse,
    code_postal: userData?.user?.code_postal,
  };
  const [role, setRole] = React.useState("Patient");
  const [formData, setFormData] = useState(
    userData.role === "patient"
      ? initialFormDataPatient
      : initialFormDataMedicine
  );
  const navigate = useNavigate();
  const handleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDate = (value) => {
    setFormData({ ...formData, DateNaissance: value });
  };

  const updateCall = async () => {
    console.log(formData);
    try {
      const response = await fetch("http://localhost:5000/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUserData({ user: formData, role: initialFormDataPatient.role });
        const responseData = await response.json();
        toast.success("Profile Updated Successfully");
        console.log(responseData);
      } else {
        console.error("Failed to update user:", response.statusText);
        // Handle error scenarios
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box sx={styles.main}>
      <Box sx={styles.typo}>
        <Typography sx={styles.font}>Paramètres</Typography>
      </Box>
      
      <Box sx={styles.gridBox}>
        <Grid container rowSpacing={3} columnSpacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Nom"
              name={userData.role === "patient" ? "Nom_Patient" : "Nom_Medecin"}
              value={
                userData.role === "patient"
                  ? formData.Nom_Patient
                  : formData.Nom_Medecin
              }
              onChange={handleForm}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Prénom"
              name={
                userData.role === "patient"
                  ? "Prenom_Patient"
                  : "Prenom_Medecin"
              }
              value={
                userData.role === "patient"
                  ? formData.Prenom_Patient
                  : formData.Prenom_Medecin
              }
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
              disabled
            />
          </Grid>
          {/* <Grid item lg={12} md={12} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date of Birth"
                  name="DateNaissance"
                  value={formData?.DateNaissance}
                  onChange={(newValue) => handleDate(newValue)}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid> */}
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

      {/* Ajout du bouton de téléchargement des CGU */}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button
          variant="contained"
          color="primary"
          href={`${process.env.PUBLIC_URL}/CGU doctobobo.pdf`} // Utilisez le nom exact du fichier dans le dossier public
          download="CGU_doctobobo.pdf"
          sx={{ marginTop: 2 }}  // Vous pouvez ajuster le style selon vos besoins
        >
          Télécharger les CGU
        </Button>
      </Grid>

        </Grid>
      </Box>
      <Box sx={styles.btnCont}>
        <Button sx={styles.btn} onClick={() => updateCall()}>
          Sauvegarder
        </Button>
      </Box>
    </Box>
  );
};

export default AccountSetting;
