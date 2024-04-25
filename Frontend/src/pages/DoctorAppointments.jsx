import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AppointmentCard from "../Components/AppointmentCard";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { styles } from "../css/doctobo.styles";

const DoctorAppointments = () => {
  const [appoints, setAppoints] = useState([]);
  const [pastAppoints, setPastAppoints] = useState([]);
  const [futureAppoints, setFutureAppoints] = useState([]);
  const { userData } = useContext(AuthContext);

  const updateAppointmentPrescription = async (appointmentId, newPrescription) => {
    try {
      const response = await fetch(`http://localhost:5000/book/updateAppointment/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prescription: newPrescription }),
      });

      const data = await response.json();
      if (response.ok) {
        setAppoints(currentAppointments => currentAppointments.map(appointment => {
          if (appointment.idAppointment === appointmentId) {
            return { ...appointment, prescription: newPrescription };
          }
          return appointment;
        }));
        toast.success('Prescription updated successfully');
      } else {
        console.error("Failed to update prescription: ", data.message);
        toast.error(`Failed to update prescription: ${data.message}`);
      }
    } catch (error) {
      console.error("Network or server error: ", error);
      toast.error("Network or server error");
    }
  };

  const getAppoints = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/book/getBookedAppointmentsDoctors?id=${userData.user.idMedecin}`
      );

      if (response.ok) {
        const resp = await response.json();
        const allAppoints = resp.appointments.flat();

        const now = new Date();
        const pastAppointments = allAppoints.filter(appoint => new Date(appoint.appointmentDate) < now);
        const futureAppointments = allAppoints.filter(appoint => new Date(appoint.appointmentDate) >= now);

        setPastAppoints(pastAppointments);
        setFutureAppoints(futureAppointments);

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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Rendez-vous passés
      </Typography>
      <Grid container spacing={3}>
        {pastAppoints.map((item, index) => (
          <AppointmentCardComponent item={item} index={index} updateAppointmentPrescription={updateAppointmentPrescription} />
        ))}
      </Grid>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Rendez-vous futurs
      </Typography>
      <Grid container spacing={3}>
        {futureAppoints.map((item, index) => (
          <AppointmentCardComponent item={item} index={index} updateAppointmentPrescription={updateAppointmentPrescription} />
        ))}
      </Grid>
    </Box>
  );
};

const AppointmentCardComponent = ({ item, index, updateAppointmentPrescription }) => {
  return (
    <Grid item lg={6} xl={4} md={6} sm={12} xs={12} key={index}>
      <AppointmentCard
        slot={item.appointmentTime}
        question={item.patientQuery}
        answer={item.prescription}
        id={item.idAppointment}
        onUpdate={updateAppointmentPrescription}
        date={item.appointmentDate}
        patientName={item.patientName}
        doctorName={item.doctorName}
      />
    </Grid>
  );
};

export default DoctorAppointments;
