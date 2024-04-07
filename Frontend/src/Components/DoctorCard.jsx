import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styles } from "../css/doctobo.styles";
import { Chip, Grid, TextField } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function DoctorCard({
  data,
  handleDate,
  selectedTime,
  setSelectedTime,
  setSelectedTimeItem,
  addAppointment,
  setpatientQuery,
  selectedDate,
}) {
  const [times, setTimes] = React.useState(
    data?.availableTime
      ? JSON.parse(data.availableTime).filter(
          (dates) => dates?.isSelected == true
        )
      : []
  );
  const [reservedTimings, setReservedTimings] = React.useState(null);
  const handleSelect = (index, item) => {
    setSelectedTime(index);
    setSelectedTimeItem(item);
  };
  const validateApi = async (doctorId, selectedDate) => {
    try {
      const response = await fetch(
        "http://localhost:5000/book/checkDoctorAvailability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_medecin: doctorId,
            date: selectedDate,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData, "errorData");
      }

      const responseData = await response.json();
      if (responseData.appointment !== null) {
        setReservedTimings(responseData?.appointment);
      } else {
        setReservedTimings(null);
      }
    } catch (error) {
      console.log(error, "catch error");
    }
  };
  const handleQuery = (e) => {
    setpatientQuery(e.target.value);
  };
  React.useEffect(() => {
    validateApi(data.idMedecin, selectedDate);
  }, [selectedDate]);
  const styles = {
    absoluteBox: {
      background: "#02298A",
      width: "150px",
      height: "150px",
      borderRadius: "100%",
      position: "absolute",
      top: -50,
      right: -50,
      opacity: 0.5,
    },
  };
  return (
    <Card
      sx={{
        // minWidth: 400,
        boxShadow: 5,
        borderRadius: "20px",
        padding: "1rem",
        position: "relative",
        background: "#0572E2",
      }}
    >
      <Box sx={styles.absoluteBox}></Box>
      <CardContent>
        <Typography color="white" gutterBottom>
          Nom : {data?.Nom_Medecin} {data?.Prenom_Medecin}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontFamily: "Poppins",
            color: "white",
          }}
        >
          Specialite : {data?.Specialite}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          Email : {data?.email}
        </Typography>
        <Typography color="white">Description : {data?.description}</Typography>
        <Typography color="white">Adresse : {data?.adresse}</Typography>
        <Box>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily: "Poppins",
              marginTop: "5px",
              color: "white",
            }}
          >
            Select Date:
          </Typography>
        </Box>
        <input
          type="date"
          onChange={(e) => handleDate(e)}
          min={new Date().toISOString().split("T")[0]}
        />
        <Box>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily: "Poppins",
              marginTop: "5px",
              color: "white",
            }}
          >
            Available Timings:
          </Typography>
        </Box>
        <Grid container>
          {times?.map((item, index) => {
            const isReserved =
              reservedTimings &&
              reservedTimings.length > 0 &&
              reservedTimings.some((reservedTime) => {
                const parsedAppointmentTime = JSON.parse(
                  reservedTime.appointmentTime
                );
                return (
                  parsedAppointmentTime.startTime === item.startTime &&
                  parsedAppointmentTime.endTime === item.endTime
                );
              });
            return (
              <Grid item lg={6}>
                <Chip
                  sx={{
                    margin: "5px",
                    boxShadow: 1,
                    backgroundColor:
                      selectedTime === index ? "#2196f3" : "#378CE7", // Blue background for selected chips
                    color: selectedTime === index ? "#fff" : "white", // White text for selected chips
                  }}
                  key={index}
                  label={`${item.startTime} to ${item.endTime}`}
                  onClick={() => handleSelect(index, item)}
                  disabled={isReserved}
                />
              </Grid>
            );
          })}
        </Grid>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Enter Your Problem or query"
          name="query"
          onChange={(e) => handleQuery(e)}
          fullWidth
          sx={{ marginTop: "12px", background: "white", borderRadius: "20px" }}
        />
      </CardContent>
      <CardActions>
        <Button
          sx={{
            background: "white",
            borderRadius: "30px",
            paddingX: "30px",
            ":hover": { background: "white" },
          }}
          size="large"
          onClick={() =>
            addAppointment(
              data.idMedecin,
              `${data?.Nom_Medecin} ${data?.Prenom_Medecin}`
            )
          }
        >
          Add Appointment
        </Button>
      </CardActions>
    </Card>
  );
}

export default DoctorCard;