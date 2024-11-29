const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const reservationRoutes = require("./server/routes/reservationRoutes");
const userRoutes = require("./server/routes/userRoutes");
const authRoutes = require("./server/routes/authRoutes"); // Import des routes d'authentification

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/users", userRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// Home
app.get("/", (req, res) => {
  res.send("Hello there :)");
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
