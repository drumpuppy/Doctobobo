import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PatientCard from "../Components/PatientCard";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { styles } from "../css/doctobo.styles";

const PatientAppointments = () => {
  const [appoints, setAppoints] = useState([]);
  const [pastAppoints, setPastAppoints] = useState([]);
  const [futureAppoints, setFutureAppoints] = useState([]);
  const { userData } = useContext(AuthContext);

  const getAppoints = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/book/getBookedAppointmentsPatients?id=${userData.user.idPatient}`
      );

      if (response.ok) {
        const resp = await response.json();
        const allAppoints = resp.appointments.flat();
        console.log("Appointments fetched:", allAppoints);
        setAppoints(allAppoints);

        // Diviser les rendez-vous en passés et futurs
        const now = new Date();
        const pastAppoints = allAppoints.filter(appoint => new Date(appoint.appointmentDate) < now);
        const futureAppoints = allAppoints.filter(appoint => new Date(appoint.appointmentDate) >= now);

        setPastAppoints(pastAppoints);
        setFutureAppoints(futureAppoints);

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

      <Typography variant="h6" sx={{ mb: 2 }}>
        Rendez-vous passés
      </Typography>
      <Grid container spacing={2}>
        {pastAppoints.map((item, index) => (
          <AppointmentItem item={item} index={index} />
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Rendez-vous futurs
      </Typography>
      <Grid container spacing={2}>
        {futureAppoints.map((item, index) => (
          <AppointmentItem item={item} index={index} />
        ))}
      </Grid>
    </Box>
  );
};

const AppointmentItem = ({ item, index }) => {
  const slot = typeof item.appointmentTime === 'string' ? JSON.parse(item.appointmentTime) : item.appointmentTime;

  return (
    <Grid item lg={6} xl={6} md={8} sm={12} xs={12} key={index}>
      <PatientCard
        id={item.idAppointment}
        slot={slot}
        question={item.patientQuery}
        answer={item.prescription}
        date={item.appointmentDate}
        patientName={item.patientName}
        doctorName={item.doctorName}
      />
    </Grid>
  );
};

export default PatientAppointments;
