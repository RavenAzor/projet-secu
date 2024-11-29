const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/database");

require("dotenv").config();

const { registerUser, loginUser } = require("../controllers/authController");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erreur de serveur." });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    const user = results[0];

    // Comparaison bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la vérification du mot de passe." });
      }
      if (!isMatch) {
        return res.status(400).json({ message: "Mot de passe incorrect." });
      }

      // Vérif si clés présentes
      if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
        return res.status(500).json({
          message: "Clé secrète manquante dans les variables d'environnement.",
        });
      }

      console.log("JWT_SECRET:", process.env.JWT_SECRET);
      console.log("JWT_REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET);

      // JWT access token
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // JWT refresh token
      const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      // Save refresh token
      db.query(
        "INSERT INTO refresh_tokens (user_id, refresh_token) VALUES (?, ?)",
        [user.id, refreshToken],
        (err, result) => {
          if (err) {
            console.error(
              "Erreur lors de la sauvegarde du refresh token:",
              err
            );
            return res.status(500).json({
              message: "Erreur lors de la sauvegarde du refresh token.",
            });
          }
          console.log("Refresh token sauvegardé avec succès.");

          // Secured cookies for refresh token
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          return res
            .status(200)
            .json({ message: "Connexion réussie", token: accessToken });
        }
      );
    });
  });
});

// Refresh route
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token manquant." });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Refresh token invalide ou expiré." });
    }

    // New access token
    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accessToken: newAccessToken });
  });
});

// Get userById route
router.get("/:id", (req, res) => {
  const userId = req.params.id;

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'utilisateur:", err);
      return res.status(500).json({
        message: "Erreur lors de la récupération de l'utilisateur.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(result[0]);
  });
});

module.exports = router;
