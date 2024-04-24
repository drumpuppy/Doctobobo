import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Button, Typography, TextField, Grid } from '@mui/material';

const styles = {
  typo: {
    fontFamily: "'Poppins'",
    fontSize: "20px",
    color: "white",
  },
  appointBtn: {
    marginTop: "10px",
    width: "100%",
    fontFamily: "'Poppins'",
    background: "linear-gradient(90deg, rgba(5,117,230,1) 0%, rgba(2,41,138,1) 82%)",
    color: "white",
    fontSize: "15px",
  },
  fileUploadBtn: {
    background: "#fff",
    color: "#0572E2",
    margin: "10px 0",
    '&:hover': {
      background: "#ccc",
    }
  },
  fileDeleteBtn: {
    background: "red",
    color: "#fff",
    marginLeft: "10px",
    '&:hover': {
      background: "darkred",
    }
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

export default function AppointmentCard({
  id,
  slot,
  question,
  answer,
  onUpdate,
  date,
  patientName,
  doctorName,
}) {
  const [prescription, setPrescription] = useState(answer);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  };

  const uploadFile = async (file) => {
    if (file.size > 5 * 1024 * 1024) { // Check if the file size exceeds 5 MB
      alert('Upload failed: File size should not exceed 5 MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://localhost:5000/book/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        alert('File uploaded successfully: ' + response.data.url);
      } else {
        alert('Upload failed: ' + response.data.message);
      }
      fetchFiles(); // Refresh files list
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: An unexpected error occurred.');
    }
  };


  const deleteFile = async (filename) => {
    try {
      const response = await axios.delete(`http://localhost:5000/book/delete/${id}/${filename}`);
      if (response.status === 200) {
        alert('File deleted successfully');
      } else {
        alert('Deletion failed: ' + response.data.message);
      }
      fetchFiles(); // Refresh files list
    } catch (error) {
      console.error('Delete error:', error);
      alert('Deletion failed: An unexpected error occurred.');
    }
  };


  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/book/files/${id}`);
      if (response.status === 200) {
        setFiles(response.data.files);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Card sx={{ borderRadius: "20px", boxShadow: 3, background: "#0572E2", position: "relative" }}>
      <Box sx={styles.absoluteBox}></Box>
      <CardContent>
        <Typography sx={[styles.typo, { fontWeight: 600 }]} gutterBottom>Date: {date}</Typography>
        <Typography sx={[styles.typo, { fontWeight: 600 }]} gutterBottom>Créneau: {`de ${slot.startTime} à ${slot.endTime}`}</Typography>
        <Typography sx={styles.typo} gutterBottom>Nom du patient: {patientName}</Typography>
        <Typography sx={styles.typo} gutterBottom>Nom du docteur: {doctorName}</Typography>
        <Typography sx={[styles.typo, { minHeight: "100px" }]} gutterBottom>Demande: {question}</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          variant="outlined"
          sx={{ background: "white", borderRadius: "20px" }}
        />
        <Button sx={styles.appointBtn} size="large" onClick={() => onUpdate(id, prescription)}>Envoyer la réponse</Button>
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload"/>
        <label htmlFor="file-upload">
          <Button variant="contained" component="span" sx={styles.fileUploadBtn}>
            Déposer un fichier
          </Button>
        </label>
        {files.map(file => (
          <Grid container key={file.name} sx={{ alignItems: 'center', marginTop: '10px' }}>
            <Grid item xs={8}>
              <Typography>{file.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={() => deleteFile(file.name)} sx={styles.fileDeleteBtn}>Supprimer</Button>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
}

