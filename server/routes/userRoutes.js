const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create user route
router.post("/create", userController.createUser);

// getAllUsers (for admin) route
router.get("/", userController.getAllUsers);

// getUser route
router.get("/:id", userController.getUser);

module.exports = router;
