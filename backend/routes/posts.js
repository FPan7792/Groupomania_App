const express = require("express");
const router = express.Router();

const isAuthorized = require("../middlewares/isAuthorized");

router.get("/posts", isAuthorized, async (req, res) => {
  res.status(200).send("REQUEST OK");
});

// CREATION
router.post("/posts/create", async (req, res) => {});

// SUPRESSION
router.post("/posts/delete", async (req, res) => {});

// MOFIFICATIONS
router.post("/posts/modify", async (req, res) => {});

// LIKES
router.post("/posts/like", async (req, res) => {});

module.exports = router;
