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
      toast.error("Fill all the Fields");
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
      toast.error("User Not Found");
    } else if (responseData.status === 401) {
      toast.error("Invalid Credentials");
    } else if (responseData.status === 200) {
      toast.success("Login Successful");
      setUser(true);
      setUserData({ user: responseData?.data?.user, role: role });
      navigate("/Dashboard");
    }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <Box sx={styles.mainScreen}>
      <Box sx={styles.LoginBox}>
        <Typography sx={styles.font}>Login</Typography>
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
              label="Password"
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
                Select Your Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Select Your Role"
                name="role"
                onChange={handleChange}
              >
                <MenuItem value={"doctor"}>Doctor</MenuItem>
                <MenuItem value={"patient"}>Patient</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button sx={styles.btn} onClick={handleSubmit}>
          Login
        </Button>
        <Box sx={styles.flex}>
          <Typography sx={{ fontFamily: "'Poppins'" }}>
            Dont't have an account?
          </Typography>
          <Box onClick={() => navigate("/Signup")}>
            <Typography sx={styles.logIn}>Signup</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
