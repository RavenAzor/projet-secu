const mysql = require("mysql2");

// Connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "camping_paradise",
});

// Vérif de la connexion
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connecté à la base de données");
  }
});

module.exports = db;
