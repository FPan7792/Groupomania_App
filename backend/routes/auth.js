const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.post("/auth/signup", authControllers.signup);
router.post("/auth/login", authControllers.login);

module.exports = router;
