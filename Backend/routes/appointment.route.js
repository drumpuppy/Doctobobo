const express = require("express");
const router = express.Router();
const { db } = global;
const createBookedAppointmentTableIfNotExists = async () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS  bookedAppointment (
          idAppointment VARCHAR(255) PRIMARY KEY,
          idPatient VARCHAR(255) NOT NULL,
          idDoctor VARCHAR(255) NOT NULL,
          appointmentDate VARCHAR(255) NOT NULL,
          appointmentTime JSON NOT NULL,
          patientQuery TEXT,
          prescription VARCHAR(255) DEFAULT NULL,
          patientName VARCHAR(255) NOT NULL,
          doctorName VARCHAR(255) NOT NULL
        )
      `;
    await db.query(createTableQuery);
    console.log(" table created or already exists");
  } catch (error) {
    console.error("Error creating Medecin table:", error);
    return false;
  }
};
router.post("/addAppointment", async (req, res) => {
  const {
    idPatient,
    docId,
    selectedTimeItem,
    selectedDate,
    patientQuery,
    patientName,
    doctorName,
  } = req.body;
  console.log(req.body);
  try {
    const { nanoid } = await import("nanoid");
    const id = nanoid();
    createBookedAppointmentTableIfNotExists();
    // Check if the bookedAppointment table exists, if not, create it
    const appointmentTime = JSON.stringify(selectedTimeItem);

    // Insert the new appointment into the database
    const insertAppointmentQuery = `
      INSERT INTO bookedAppointment (idAppointment, idPatient, idDoctor, appointmentDate, appointmentTime, patientQuery,patientName,doctorName)
      VALUES ('${id}', '${idPatient}', '${docId}', '${selectedDate}', '${appointmentTime}', '${patientQuery}','${patientName}','${doctorName}')
    `;

    await db.query(insertAppointmentQuery);

    res
      .status(200)
      .send({ message: "Appointment added successfully", status: true });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/checkDoctorAvailability", async (req, res) => {
  const { id_medecin, date } = req.body;

  try {
    const findAppointmentQuery = `
      SELECT *
      FROM bookedAppointment
      WHERE idDoctor = '${id_medecin}' AND appointmentDate = '${date}'
    `;

    const result = await db.query(findAppointmentQuery);
    if (result && result.length > 0) {
      const appointment = result[0];
      console.log(result[0], "result");
      if (appointment) {
        res.status(200).send({ appointment });
      } else {
        res.status(200).send({ appointment: null }); // Return null when appointment data isn't found
      }
    } else {
      res.status(404).send({
        message: "Doctor's availability not found",
        appointment: null,
      });
    }
  } catch (error) {
    console.error("Error checking doctor availability:", error);
    res
      .status(500)
      .send({ message: "Internal server error", appointment: null });
  }
});
router.get("/getBookedAppointmentsDoctors", async (req, res) => {
  const { id } = req.query;
  try {
    const findAppointmentQuery = `
      SELECT *
      FROM bookedAppointment
      WHERE idDoctor = '${id}'
    `;
    const appointments = await db.query(findAppointmentQuery);
    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/getBookedAppointmentsPatients", async (req, res) => {
  const { id } = req.query;
  try {
    const findAppointmentQuery = `
      SELECT *
      FROM bookedAppointment
      WHERE idPatient = '${id}'
    `;
    const appointments = await db.query(findAppointmentQuery);
    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/updateAppointment/:id", async (req, res) => {
  console.log(req.path);
  const { id } = req.params;
  const { prescription } = req.body;

  try {
    const updateAppointmentQuery = `
      UPDATE bookedappointment
      SET prescription = ?
      WHERE idAppointment = ?
    `;
    await db.query(updateAppointmentQuery, [prescription, id]);

    res.status(200).json({ message: "Appointment updated successfully" });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
