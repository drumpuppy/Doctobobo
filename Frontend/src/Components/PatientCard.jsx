import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Button, Typography, Grid } from '@mui/material';

const styles = {
  typo: {
    fontFamily: "'Poppins'",
    fontSize: "20px",
    color: "white",
  },
  fileUploadBtn: {
    background: "#fff",
    color: "#0573E3",
    '&:hover': {
      background: "#ccc",
    }
  },
  fileDeleteBtn: {
    background: "red",
    color: "#fff",
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
    bottom: -40,
    right: -40,
    opacity: 0.5,
  },
};

export default function PatientCard({
  id,
  slot,
  question,
  answer,
  date,
  patientName,
  doctorName
}) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (id) {
      fetchFiles();
    }
  }, [id]); // Dependency on `id`
  

  const fetchFiles = async () => {
    if (id) { // Ensure `id` is not undefined
      try {
        const response = await axios.get(`http://localhost:5000/book/files/${id}`);
        if (response.status === 200) {
          setFiles(response.data.files);
        } else {
          console.error('Error with status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    } else {
      console.error('Appointment ID is undefined');
    }
  };
  

  const handleFileUpload = async (file) => {
    console.log('Uploading file for appointment ID:', id); // Debugging log
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(`http://localhost:5000/book/upload/${id}`, formData);
      console.log('File uploaded, server response:', response); // Debugging log
      fetchFiles(); // Refresh file list after upload
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const downloadFile = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/book/download/${id}/${fileName}`);
      const signedUrl = response.data.url;
      window.open(signedUrl, '_blank');
    } catch (error) {
      console.error('Download error:', error);
    }
  };
  


  if (slot && slot.startTime && slot.endTime) {

    return (
      <Card sx={{ position: "relative", borderRadius: "20px", boxShadow: 3, background: "#0573E3" }}>
        <Box sx={styles.absoluteBox}></Box>
        <CardContent>
          <Typography sx={[styles.typo, { fontWeight: 600 }]} gutterBottom>Date: {date}</Typography>
          <Typography sx={[styles.typo, { fontWeight: 600 }]} gutterBottom>Créneau: {slot && slot.startTime && slot.endTime ? `${slot.startTime} to ${slot.endTime}` : 'Time not available'}</Typography>
          <Typography sx={styles.typo} gutterBottom>Nom du patient: {patientName}</Typography>
          <Typography sx={styles.typo} gutterBottom>Nom du médecin: {doctorName}</Typography>
          <Typography sx={[styles.typo, { minHeight: "100px" }]} gutterBottom> Votre bobo : {question}</Typography>
          {answer === null ? (
            <Typography sx={[styles.typo, { color: "red" }]}>No response yet</Typography>
          ) : (
            <Typography sx={styles.typo}>{answer}</Typography>
          )}
          <input
            type="file"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            style={{ display: 'none' }}
            id={`file-upload-${id}`}
          />
          <label htmlFor={`file-upload-${id}`}>
            <Button sx={styles.fileUploadBtn} component="span">
              Déposer un fichier
            </Button>
          </label>
          {files.map(file => (
            <Grid container key={file.name} sx={{ alignItems: 'center', marginTop: '10px' }}>
              <Grid item xs={8}>
              <Typography>{file.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button sx={styles.fileUploadBtn} onClick={() => downloadFile(file.name)}>Télécharger</Button>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    );
  }
}