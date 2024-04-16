import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PatientCard from "../Components/PatientCard";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { styles } from "../css/doctobo.styles";

const PatientAppointments = () => {
  const [appoints, setAppoints] = useState([]);
  const { userData } = useContext(AuthContext);

  const getAppoints = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/book/getBookedAppointmentsPatients?id=${userData.user.idPatient}`
      );

      if (response.ok) {
        const resp = await response.json();
        console.log("Appointments fetched:", resp.appointments);
        setAppoints(resp.appointments.flat());
      } else {
        toast.error('Failed to fetch appointments');
        console.error("Error fetching appointments:", await response.text());
      }
    } catch (error) {
      toast.error('Network or server error');
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppoints();
  }, []);

  return (
    <Box sx={styles.main}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Mes Rendez-vous
      </Typography>
      <Grid container spacing={2}>
      {appoints.map((item, index) => {
        const slot = typeof item.appointmentTime === 'string' ? JSON.parse(item.appointmentTime) : item.appointmentTime;

        return (
          <Grid item lg={6} xl={6} md={8} sm={12} xs={12} key={index}>
            <PatientCard
              slot={slot}
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
  );
};

export default PatientAppointments;
