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

export default function AppointmentCard({
  slot,
  question,
  answer,
  onUpdate,
  id,
  patientName,
  doctorName,
}) {
  const [prescription, setPrescription] = React.useState(answer);
  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: 3,
        background: "#0572E2",
        position: "relative",
      }}
    >
      <Box sx={styles.absoluteBox}></Box>
      <CardContent>
        <Typography
          sx={[styles.typo, { color: "white", fontWeight: 600 }]}
          gutterBottom
        >
          Date: {`${slot.startTime} to ${slot.endTime}`}
        </Typography>
        <Typography
          sx={[styles.typo, { color: "white", fontWeight: 600 }]}
          gutterBottom
        >
          Time Slot: {`${slot.startTime} to ${slot.endTime}`}
        </Typography>
        <Typography sx={[styles.typo]} gutterBottom>
          Patient Name: {patientName}
        </Typography>
        <Typography sx={[styles.typo]} gutterBottom>
          Doctor Name: {doctorName}
        </Typography>
        <Typography sx={[styles.typo, { minHeight: "100px" }]} gutterBottom>
          Patient Query: {question}
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
                Add Prescription:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                variant="outlined"
                sx={{
                  color: "white",
                  background: "white",
                  borderRadius: "20px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Button
          sx={styles.appointBtn}
          size="large"
          onClick={() => onUpdate(id, prescription, setPrescription)}
        >
          SEND ANSWER
        </Button>
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
  absoluteBox: {
    background: "#02298A",
    width: "200px",
    height: "200px",
    borderRadius: "100%",
    position: "absolute",
    top: -50,
    right: -50,
    opacity: 0.5,
  },
};
