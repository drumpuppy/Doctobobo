import { Box, Button, Chip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "../css/AddDoctorAvailablity.styles";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const AddDoctorAvailablity = () => {
  const hoursArray = [
    { startTime: "12:00 AM", endTime: "01:00 AM", isSelected: false },
    { startTime: "01:00 AM", endTime: "02:00 AM", isSelected: false },
    { startTime: "02:00 AM", endTime: "03:00 AM", isSelected: false },
    { startTime: "03:00 AM", endTime: "04:00 AM", isSelected: false },
    { startTime: "04:00 AM", endTime: "05:00 AM", isSelected: false },
    { startTime: "05:00 AM", endTime: "06:00 AM", isSelected: false },
    { startTime: "06:00 AM", endTime: "07:00 AM", isSelected: false },
    { startTime: "07:00 AM", endTime: "08:00 AM", isSelected: false },
    { startTime: "08:00 AM", endTime: "09:00 AM", isSelected: false },
    { startTime: "09:00 AM", endTime: "10:00 AM", isSelected: false },
    { startTime: "10:00 AM", endTime: "11:00 AM", isSelected: false },
    { startTime: "11:00 AM", endTime: "12:00 PM", isSelected: false },
    { startTime: "12:00 PM", endTime: "01:00 PM", isSelected: false },
    { startTime: "01:00 PM", endTime: "02:00 PM", isSelected: false },
    { startTime: "02:00 PM", endTime: "03:00 PM", isSelected: false },
    { startTime: "03:00 PM", endTime: "04:00 PM", isSelected: false },
    { startTime: "04:00 PM", endTime: "05:00 PM", isSelected: false },
    { startTime: "05:00 PM", endTime: "06:00 PM", isSelected: false },
    { startTime: "06:00 PM", endTime: "07:00 PM", isSelected: false },
    { startTime: "07:00 PM", endTime: "08:00 PM", isSelected: false },
    { startTime: "08:00 PM", endTime: "09:00 PM", isSelected: false },
    { startTime: "09:00 PM", endTime: "10:00 PM", isSelected: false },
    { startTime: "10:00 PM", endTime: "11:00 PM", isSelected: false },
    { startTime: "11:00 PM", endTime: "12:00 AM", isSelected: false },
  ];
  const [timeSlots, setTimeSlots] = useState(hoursArray);
  const { userData } = useContext(AuthContext);

  const handleChipClick = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].isSelected = true;
    setTimeSlots(updatedTimeSlots);
  };
  const updateTimeAvailability = async () => {
    let email = userData.user.email;
    try {
      const response = await fetch(
        "http://localhost:5000/user/updateTimeAvailability",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, availableTime: timeSlots }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Agenda modifié avec succès");
      } else {
        console.error("Failed to update time availability");
        toast.error("Erreur lors de la modification de l'agenda");
      }
    } catch (error) {
      console.error("Error updating time availability:", error);
      toast.error("Erreur lors de la modification de l'agenda");
    }
  };

  return (
    <>
      <Box sx={styles.main}>
        <h2>Ajouter vos disponibilités</h2>
        <Box>
          {timeSlots.map((slot, index) => (
            <Chip
              sx={{ margin: "5px", boxShadow: 1 }}
              key={index}
              label={`${slot.startTime} to ${slot.endTime}`}
              disabled={slot.isSelected}
              onClick={() => handleChipClick(index)}
              // You can add onClick event handler or other props here if needed
              // isSelected={slot.isSelected}
            />
          ))}
        </Box>
        <Box sx={styles.btnBox}>
          <Button
            variant="contained"
            sx={styles.btn}
            onClick={updateTimeAvailability}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddDoctorAvailablity;
