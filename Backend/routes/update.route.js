const express = require("express");
const router = express.Router();
const { db } = global;

router.put("/update", async (req, res) => {
  const { role, Nom, Prenom, email, adresse, code_postal } = req.body;

  try {
    if (role === "patient") {
      const updateUserQuery = `
          UPDATE User
          SET Nom_Patient = ?,
              Prenom_Patient = ?,
              email = ?,
              adresse = ?,
              code_postal = ?
          WHERE email = ?
        `;
      await db.query(updateUserQuery, [Nom, Prenom, email, adresse, code_postal, email]);
    } else {
      const updateMedecinQuery = `
          UPDATE Medecin
          SET Nom_Medecin = ?,
              Prenom_Medecin = ?,
              email = ?,
              adresse = ?,
              code_postal = ?
          WHERE email = ?
        `;
      await db.query(updateMedecinQuery, [Nom, Prenom, email, adresse, code_postal, email]);
    }

    return res
      .status(200)
      .send({ message: "User updated successfully", status: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.put("/updateTimeAvailability", async (req, res) => {
  const { email, availableTime } = req.body;
  try {
    const updateMedecinQuery = `
      UPDATE Medecin
      SET availableTime = ?
      WHERE email = ?
    `;
    await db.query(updateMedecinQuery, [JSON.stringify(availableTime), email]);

    return res.status(200).send({
      message: "Time availability updated successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error updating time availability:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;