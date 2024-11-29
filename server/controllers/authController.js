const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

// registerUser
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Vérif si user existe déjà
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.error("Erreur lors de la vérification de l'utilisateur:", err); // Log de l'erreur
        return res.status(500).json({
          message: "Erreur lors de la vérification de l'utilisateur.",
        });
      }
      if (result.length > 0) {
        console.log("Cet utilisateur existe déjà.");
        return res
          .status(400)
          .json({ message: "Cet utilisateur existe déjà." });
      }

      // crypt password
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("Données à insérer dans la base de données:", [
        firstName,
        lastName,
        email,
        hashedPassword,
      ]);

      db.query(
        "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error(
              "Erreur lors de l'enregistrement de l'utilisateur:",
              err
            );
            return res.status(500).json({
              message: "Erreur lors de l'enregistrement de l'utilisateur.",
            });
          }

          res.status(201).json({ message: "Utilisateur créé avec succès." });
        }
      );
    }
  );
};

// loginUser
const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la connexion." });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    const user = result[0];

    // Vérif password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la vérification du mot de passe." });
      }
      if (!isMatch) {
        return res.status(400).json({ message: "Mot de passe incorrect." });
      }

      // JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        "clé_secrète"
      );

      // send token to user
      res.status(200).json({ message: "Connexion réussie.", token });
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
