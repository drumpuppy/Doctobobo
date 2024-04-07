import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DoctorCard from "../../Components/DoctorCard";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
const styles = {
  main: {
    width: "100%",
    paddingY: "30px",
    // marginTop: "20px",
  },
  cont: {
    paddingTop: "50px",
    maxWidth: { lg: "1500px" },
  },
  image: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  font: {
    fontFamily: "'poppins'",
    color: "black",

    fontSize: "30px",
    fontWeight: 600,
    textAlign: "center",
  },
  flex: {
    display: "flex",
    flexDirection: "column",
  },
  boxy: {
    marginTop: "40px",
  },
};

const Doctors = ({ search }) => {
  const [docs, setDocs] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedTimeItem, setSelectedTimeItem] = useState({});
  const [patientQuery, setpatientQuery] = useState("");
  const { userData, user } = useContext(AuthContext);
  const getAllDoctors = async () => {
    const response = await fetch("http://localhost:5000/Medecin/Medecin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    console.log(responseData.medicines[0]);
    setDocs(responseData.medicines[0]);
  };
  const handleDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const addAppointment = async (docId, docName) => {
    if (user) {
      if (userData.role === "patient") {
        if (Object.keys(selectedTimeItem).length !== 0) {
          const appointmentData = {
            idPatient: userData.user.idPatient,
            docId: docId,
            selectedTimeItem: selectedTimeItem,
            selectedDate: selectedDate,
            patientQuery: patientQuery,
            patientName: `${userData.user.Nom_Patient} ${userData.user.Prenom_Patient}`,
            doctorName: docName,
          };
          try {
            const response = await fetch(
              "http://localhost:5000/book/addAppointment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(appointmentData),
              }
            );

            if (response.ok) {
              const data = await response.json();
              toast.success("Appointment has been made");
              console.log(data.message);
            } else {
              console.error("Failed to add appointment:", response.statusText);
            }
          } catch (error) {
            console.error("Error adding appointment:", error);
          }
        } else {
          toast.error(
            "Please Select Appoitnment Time Or Doctor Didnt Publish his Availablity"
          );
        }
      } else {
        toast.error("Doctor can not made appointment. Register as Patient");
      }
    } else {
      toast.error("You Need To Login First");
    }
  };
  console.log(userData);
  useEffect(() => {
    getAllDoctors();
  }, []);
  return (
    <Box sx={styles.main}>
      <Container sx={styles.cont}>
        <Typography sx={styles.font}>All Available Doctors</Typography>
        <Box sx={styles.boxy}>
          <Grid
            container
            columnSpacing={3}
            rowSpacing={3}
            display={"flex"}
            justifyContent={"center"}
          >
            {docs &&
              docs?.length > 0 &&
              docs
                ?.filter(
                  (doc) =>
                    doc.Specialite.toLowerCase().includes(
                      search.toLowerCase()
                    ) ||
                    doc.adresse.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => {
                  return (
                    <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
                      <DoctorCard
                        data={item}
                        handleDate={handleDate}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        setSelectedTimeItem={setSelectedTimeItem}
                        addAppointment={addAppointment}
                        setpatientQuery={setpatientQuery}
                        selectedDate={selectedDate}
                      />
                    </Grid>
                  );
                })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Doctors;
