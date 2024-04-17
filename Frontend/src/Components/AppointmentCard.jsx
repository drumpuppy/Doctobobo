import React, { useState } from 'react';
import axios from 'axios';
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
  id,
  slot,
  question,
  answer,
  onUpdate,
  patientName,
  doctorName,
}) {
  const [prescription, setPrescription] = useState(answer);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
          const response = await axios.post(`http://localhost:5000/book/upload/${id}`, formData);
          alert('File uploaded: ' + response.data.url);
      } catch (error) {
          console.error('Upload error:', error);
          alert('Upload failed');
      }
  };

  const deleteFile = async (filename) => {
      try {
          await axios.delete(`http://localhost:5000/book/delete/${id}/${filename}`);
          alert('File deleted successfully');
      } catch (error) {
          console.error('Delete error:', error);
          alert('Delete failed');
      }
  };

  const fileUrl = (fileName) => {
    const bucketName = 'doctobobo';
    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  };

  return (
    <Card sx={{ borderRadius: "20px", boxShadow: 3, background: "#0572E2", position: "relative" }}>
      <Box sx={styles.absoluteBox}></Box>
      <CardContent>
        <Typography sx={[styles.typo, { color: "white", fontWeight: 600 }]} gutterBottom>
          Date: {`de ${slot.startTime} à ${slot.endTime}`}
        </Typography>
        <Typography sx={[styles.typo, { color: "white", fontWeight: 600 }]} gutterBottom>
          Créneau: {`de ${slot.startTime} à ${slot.endTime}`}
        </Typography>
        <Typography sx={styles.typo} gutterBottom>
          Nom du patient: {patientName}
        </Typography>
        <Typography sx={styles.typo} gutterBottom>
          Nom du docteur: {doctorName}
        </Typography>
        <Typography sx={[styles.typo, { minHeight: "100px" }]} gutterBottom>
          Demande: {question}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              variant="outlined"
              sx={{ color: "white", background: "white", borderRadius: "20px" }}
            />
          </Grid>
        </Grid>
        <Button sx={styles.appointBtn} size="large" onClick={() => onUpdate(id, prescription)}>
          Envoyer la réponse
        </Button>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadFile}>Upload</button>
          {file && (
            <button onClick={() => deleteFile(file.name)}>Delete</button>
          )}
        </div>
        <div>
            {fileUrl && <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>}
        </div>
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
