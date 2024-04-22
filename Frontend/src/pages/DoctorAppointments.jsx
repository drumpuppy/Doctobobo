import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AppointmentCard from "../Components/AppointmentCard";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { styles } from "../css/doctobo.styles";  // Ensure this path matches the location of your styles

const DoctorAppointments = () => {
  const [appoints, setAppoints] = useState([]);
  const { userData } = useContext(AuthContext);

  const updateAppointmentPrescription = async (appointmentId, newPrescription) => {
    try {
      // Send a PUT request to update the appointment's prescription
      const response = await fetch(`http://localhost:5000/book/updateAppointment/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prescription: newPrescription }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // If the response is OK, update the appointments state
        setAppoints(currentAppointments => currentAppointments.map(appointment => {
          if (appointment.idAppointment === appointmentId) {
            return { ...appointment, prescription: newPrescription };
          }
          return appointment;
        }));
        toast.success('Prescription updated successfully');
      } else {
        // Handle errors here
        console.error("Failed to update prescription: ", data.message);
        toast.error(`Failed to update prescription: ${data.message}`);
      }
    } catch (error) {
      // Handle network errors here
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

  useEffect(() => {
    console.log(appoints); // Log the appointments to see if they have the expected structure
  }, [appoints]);
  

  return (
    <Box sx={styles.main}>
      <Typography sx={styles.font}>Mes Rendez-vous</Typography>
      <Box sx={styles.cont}>
        <Grid container spacing={3} sx={styles.doctorPageStyles.doctorsContainer}>
        {appoints.map((item, index) => {
         const slot = item && typeof item.appointmentTime === 'object' ? item.appointmentTime : null;
        if (!item || typeof item !== 'object' || !item.appointmentTime) {
          return null;
        }

        if (!slot || !slot.startTime) {
          return (
            <Grid item lg={6} xl={4} md={6} sm={12} xs={12} key={index}>
              <Typography variant="body2">Invalid appointment data</Typography>
            </Grid>
          );
        }
        return (
          <Grid item lg={6} xl={4} md={6} sm={12} xs={12} key={index}>
            
              <AppointmentCard
                slot={slot}
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
      })}
        </Grid>
      </Box>
    </Box>
  );
};

export default DoctorAppointments;
