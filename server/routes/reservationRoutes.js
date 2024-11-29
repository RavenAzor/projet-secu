const express = require("express");
const db = require("../config/database");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");

// Create reservation
router.post("/", authenticateJWT, (req, res) => {
  const {
    clientName,
    email,
    checkInDate,
    checkOutDate,
    houseType,
    totalAmount,
  } = req.body;

  db.query(
    "SELECT * FROM reservations WHERE houseType = ? AND ((checkInDate BETWEEN ? AND ?) OR (checkOutDate BETWEEN ? AND ?))",
    [houseType, checkInDate, checkOutDate, checkInDate, checkOutDate],
    (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de la vérification des dates de réservation:",
          err
        );
        return res.status(500).json({
          message: "Erreur lors de la vérification des dates de réservation.",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Ce type de maison est déjà réservé pour ces dates.",
        });
      }

      db.query(
        "INSERT INTO reservations (clientName, email, checkInDate, checkOutDate, houseType, totalAmount, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          clientName,
          email,
          checkInDate,
          checkOutDate,
          houseType,
          totalAmount,
          req.user.id,
        ],
        (err, result) => {
          if (err) {
            console.error(
              "Erreur lors de l'enregistrement de la réservation:",
              err
            );
            return res.status(500).json({
              message: "Erreur lors de l'enregistrement de la réservation.",
            });
          }

          res.status(201).json({ message: "Réservation créée avec succès." });
        }
      );
    }
  );
});

// get all reservations
router.get("/", (req, res) => {
  db.query("SELECT * FROM reservations", (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des réservations:", err);
      return res.status(500).json({
        message: "Erreur lors de la récupération des réservations.",
      });
    }

    res.status(200).json(result);
  });
});

// get reservations by UserID
router.get("/user/:id", authenticateJWT, (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM reservations WHERE user_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des réservations:", err);
        return res.status(500).json({
          message: "Erreur lors de la récupération des réservations.",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Aucune réservation trouvée pour cet utilisateur.",
        });
      }

      res.status(200).json(results);
    }
  );
});

module.exports = router;
