import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const styles = {
  typo: {
    fontFamily: "'Poppins'",
    fontSize: "20px",
    color: "white",
  },
  typo2: {
    fontFamily: "'Poppins'",
    fontSize: "20px",
    marginTop: "5px",
    fontWeight: 600,
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

export default function PatientCard({
  slot,
  question,
  answer,
  date,
  patientName,
  doctorName,
}) {
  if (slot && slot.startTime && slot.endTime) {

  const fileUrl = (fileName) => {
    const bucketName = 'doctobobo';
    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  };
  

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
        <Typography sx={[styles.typo, { fontWeight: 600 }]} gutterBottom>
          Date: {date}
        </Typography>
        <Typography sx={[styles.typo, { fontWeight: 600 }]} gutterBottom>
          Créneau: {`${slot.startTime} to ${slot.endTime}`}
        </Typography>
        <Typography sx={styles.typo} gutterBottom>
          Nom du patient: {patientName}
        </Typography>
        <Typography sx={styles.typo} gutterBottom>
          Nom du médecin: {doctorName}
        </Typography>
        <Typography sx={[styles.typo, { minHeight: "100px" }]} gutterBottom>
          Votre bobo: {question}
        </Typography>
        <Typography sx={[styles.typo, { fontSize: "18px" }]}>
          Réponse du docteur:
        </Typography>
        {answer === null ? (
          <Typography sx={[styles.typo2, { color: "red" }]}>
            Pas encore de réponse
          </Typography>
        ) : (
          <Typography sx={styles.typo2}>{answer}</Typography>
        )}
        <div>
            {fileUrl && <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>}
        </div>
      </CardContent>
    </Card>
  );}
}
