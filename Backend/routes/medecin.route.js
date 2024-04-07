const express = require("express");
const router = express.Router();
const { db } = global;

router.get("/Medecin", async (req, res) => {
  try {
    const getAllMedicinesQuery = `SELECT * FROM medecin`;
    const medicines = await db.query(getAllMedicinesQuery);
    res.status(200).json({ medicines });
  } catch (error) {
    console.error("Error fetching Medecin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
