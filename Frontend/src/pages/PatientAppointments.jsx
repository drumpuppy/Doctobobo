import React, { useContext, useEffect, useState } from "react";
import { styles } from "../css/doctobo.styles";
import { Box, Grid, Typography } from "@mui/material";
import AppointmentCard from "../Components/AppointmentCard";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import PatientCard from "../Components/PatientCard";
const PatientAppointments = () => {
  const [appoints, setAppoints] = useState([]);
  const { userData } = useContext(AuthContext);
  const getAppoints = async () => {
    console.log(userData);
    try {
      const response = await fetch(
        `http://localhost:5000/book/getBookedAppointmentsPatients?id=${userData.user.idPatient}`
      );

      const resp = await response.json();
      console.log(resp.appointments[0], "resp");
      setAppoints(resp.appointments[0]);
    } catch (error) {
      console.log("errors");
    }
  };

  useEffect(() => {
    getAppoints();
  }, []);
  return (
    <Box sx={styles.main}>
      <Box sx={styles.typo}>
        <Typography sx={styles.font}>My Appointments</Typography>
      </Box>
      <Box sx={styles.gridBox}>
        <Grid container columnSpacing={3} rowSpacing={3}>
          {appoints &&
            appoints?.length > 0 &&
            appoints?.map((item, index) => {
              return (
                <Grid item lg={6} xl={4} md={6} sm={12} xs={12} key={index}>
                  <PatientCard
                    slot={JSON.parse(item.appointmentTime)}
                    question={item.patientQuery}
                    answer={item.prescription}
                    date={item.appointmentDate}
                    patientName={item.patientName}
                    doctorName={item.doctorName}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientAppointments;
