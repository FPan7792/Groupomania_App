const express = require("express");
const router = express.Router();

router.get("/posts", async (req, res) => {
  sequelize.authenticate();
  sequelize.query("SELECT * from users").then(([results, metadata]) => {
    console.log(results);
    console.log(metadata);
  });
  res.status(200).send("OK");
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
