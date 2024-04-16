import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "../css/doctobo.styles";
import Search from "../Components/Search";
import DoctorCard from "../Components/DoctorCard";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Doctobo = () => {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTime, setSelectedTime] = useState();
  const [selectedTimeItem, setSelectedTimeItem] = useState({});
  const [patientQuery, setpatientQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const { userData } = useContext(AuthContext);
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
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleDate = (e) => {
    setSelectedDate(e.target.value);
  };
  const addAppointment = async (docId) => {
    const appointmentData = {
      idPatient: userData.user.idPatient,
      docId: docId,
      selectedTimeItem: selectedTimeItem,
      selectedDate: selectedDate,
      patientQuery: patientQuery,
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
        toast.success("Le rendez-vous est enregistré");
        console.log(data.message);
      } else {
        console.error("Failed to add appointment:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <Box sx={styles.main}>
      <Box sx={styles.typo}>
        <Typography sx={styles.font}>Doctobo</Typography>
      </Box>
      <Box>
        <Search handleChange={handleChange} search={search} />
      </Box>
      <Box sx={styles.gridBox}>
        <Grid container columnSpacing={3} rowSpacing={3}>
          {docs &&
            docs.length > 0 &&
            docs
              ?.filter(
                (doc) =>
                  doc.Specialite.toLowerCase().includes(search.toLowerCase()) ||
                  doc.adresse.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => {
                return (
                  <Grid item lg={6} xl={4} md={6} sm={12} xs={12} key={index}>
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
    </Box>
  );
};

export default Doctobo;
