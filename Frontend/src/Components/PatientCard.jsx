import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Grid, TextField } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function PatientCard({
  slot,
  question,
  answer,
  date,
  patientName,
  doctorName,
}) {
  const [prescription, setPrescription] = React.useState(answer);
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "20px",
        boxShadow: 3,
        background: "#0573E3",
      }}
    >
      <Box sx={styles.absoluteBox}></Box>
      <CardContent>
        <Typography
          sx={[styles.typo, { color: "white", fontWeight: 600 }]}
          gutterBottom
        >
          Date: {date}
        </Typography>
        <Typography
          sx={[styles.typo, { color: "white", fontWeight: 600 }]}
          gutterBottom
        >
          Créneau: {`${slot.startTime} to ${slot.endTime}`}
        </Typography>
        <Typography sx={[styles.typo]} gutterBottom>
          Nom du patient: {patientName}
        </Typography>
        <Typography sx={[styles.typo]} gutterBottom>
          Nom du patient: {doctorName}
        </Typography>
        <Typography sx={[styles.typo, { minHeight: "100px" }]} gutterBottom>
          Your Query: {question}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",

                flexDirection: "column",
              }}
            >
              <Typography sx={[styles.typo, { fontSize: "18px" }]}>
                Doctor's Reply:
              </Typography>
              {answer === null ? (
                <Typography sx={[styles.typo2, { color: "red" }]}>
                  Not Responded By Doctor Yet
                </Typography>
              ) : (
                <Typography sx={styles.typo2}>{answer}</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
const styles = {
  typo: {
    fontFamily: "'poppins'",
    fontSize: "20px",
    color: "white",
  },
  appointBtn: {
    marginTop: "10px",
    width: "100%",
    fontFamily: "'poppins'",

    background:
      "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    color: "white",

    fontSize: "15px",
  },
  typo2: {
    fontFamily: "'poppins'",
    fontSize: "15px",
    marginTop: "5px",
    fontWeight: 600,
    fontSize: "20px",
  },
  absoluteBox: {
    background: "#02298A",
    width: "200px",
    height: "200px",
    borderRadius: "100%",
    position: "absolute",
    bottom: -40,
    right: -40,
    opacity: 0.5,
  },
};
