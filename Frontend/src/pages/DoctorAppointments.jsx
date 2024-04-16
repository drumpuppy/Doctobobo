import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AppointmentCard from "../Components/AppointmentCard";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { styles } from "../css/doctobo.styles";  // Ensure this path matches the location of your styles

const DoctorAppointments = () => {
  const [appoints, setAppoints] = useState([]);
  const { userData } = useContext(AuthContext);

  const getAppoints = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/book/getBookedAppointmentsDoctors?id=${userData.user.idMedecin}`
      );

      if (response.ok) {
        const resp = await response.json();
        setAppoints(resp.appointments);
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
      <Typography sx={styles.font}>Mes Rendez-vous</Typography>
      <Box sx={styles.cont}>
        <Grid container spacing={3} sx={styles.doctorPageStyles.doctorsContainer}>
        {appoints.map((item, index) => {
        const slot = item.appointmentTime ? JSON.parse(item.appointmentTime) : null;
        return (
          <Grid item lg={6} xl={4} md={6} sm={12} xs={12} key={index}>
            {slot && slot.startTime ? (
              <AppointmentCard
                slot={slot}
                question={item.patientQuery}
                answer={item.prescription}
                id={item.idAppointment}
                onUpdate={() => {}}
                patientName={item.patientName}
                doctorName={item.doctorName}
              />
            ) : (
              <Typography variant="body2">Invalid appointment data</Typography>
            )}
          </Grid>
        );
      })}
        </Grid>
      </Box>
    </Box>
  );
};

export default DoctorAppointments;
