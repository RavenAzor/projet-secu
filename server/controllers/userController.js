const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../model/User");

// Create user
exports.createUser = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const query =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(
    query,
    [firstName, lastName, email, password, role],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de l'utilisateur" });
      }
      res.status(201).json({
        message: "Utilisateur créé avec succès",
        userId: result.insertId,
      });
    }
  );
};

// getAllUsers
exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
    res.status(200).json(results);
  });
};

// getUser
exports.getUser = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
    if (!result.length) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(result[0]);
  });
};
