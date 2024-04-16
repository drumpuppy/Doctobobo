import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import DoctorCard from "../../Components/DoctorCard";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import steImage from "../../assets/ste.png";
import { styles } from "../../css/doctobo.styles";

const Doctors = ({ search, searchPostalCode }) => {
  const [docs, setDocs] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedTimeItem, setSelectedTimeItem] = useState({});
  const [patientQuery, setpatientQuery] = useState("");
  const { userData, user } = useContext(AuthContext);
  
  const getAllDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/Medecin/Medecin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      setDocs(responseData.medicines[0]);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
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
              toast.success("Rendez-vous enregistré");
              console.log(data.message);
            } else {
              console.error("Failed to add appointment:", response.statusText);
            }
          } catch (error) {
            console.error("Error adding appointment:", error);
          }
        } else {
          toast.error("Merci de selectionner un créneau.");
        }
      } else {
        toast.error("Vous ne pouvez pas prendre de rendez-vous, connectez vous en tant que patient");
      }
    } else {
      toast.error("Vous n'êtes pas connecté à votre compte. Merci de vous connecter.");
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  // Filtrer les médecins en fonction de la recherche et du code postal
  const filteredDoctors = docs.filter(doc => {
    const searchLower = search.toLowerCase();
    const searchPostalLower = searchPostalCode.toLowerCase();
    const docSpecialiteLower = doc.Specialite.toLowerCase();
    const docNomLower = doc.Nom_Medecin.toLowerCase();
    const docPostalLower = doc.code_postal ? doc.code_postal.toLowerCase() : ""; // Assurez-vous que le nom de la propriété est correct

    return (
      (docSpecialiteLower.includes(searchLower) || docNomLower.includes(searchLower)) &&
      (searchPostalCode === "" || docPostalLower.includes(searchPostalLower))
    );
  });

  return (
    <Box sx={{ ...styles.main, backgroundImage: `url(${steImage})` }}>
      <Container sx={styles.cont}>
        <Typography sx={styles.font}>Docteurs disponibles</Typography>
        <Box sx={styles.boxy}>
          <Grid
            container
            columnSpacing={3}
            rowSpacing={3}
            display={"flex"}
            flexWrap="wrap"
            justifyContent={"center"}
          >
            {filteredDoctors.map((item, index) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
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
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Doctors;
