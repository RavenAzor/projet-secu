const db = require("../model/Reservation");

// Create reservation
exports.createReservation = (req, res) => {
  const {
    clientName,
    email,
    checkInDate,
    checkOutDate,
    houseType,
    totalAmount,
  } = req.body;

  const query =
    "INSERT INTO reservations (clientName, email, checkInDate, checkOutDate, houseType, totalAmount) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [clientName, email, checkInDate, checkOutDate, houseType, totalAmount],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de la réservation" });
      }
      res.status(201).json({
        message: "Réservation créée avec succès",
        reservationId: result.insertId,
      });
    }
  );
};

// getAllReservations
exports.getAllReservations = (req, res) => {
  const query = "SELECT * FROM reservations";

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des réservations" });
    }
    res.status(200).json(results);
  });
};

// getReservation
exports.getReservation = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM reservations WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la réservation" });
    }
    if (!result.length) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.status(200).json(result[0]);
  });
};
