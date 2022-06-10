const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const dayjs = require("dayjs");
const localeFR = require("dayjs/plugin/localeData");
dayjs.extend(localeFR);

const User = require("../models/User");

router.post("/auth/signup", async (req, res) => {
  const { email, password, is_admin } = req.body;

  try {
    const hash = await argon2
      .hash(password, {
        type: argon2.argon2id,
        hashLength: 16,
      })
      .then((hash) => {
        return hash;
      });

    const newUser = await User.create({ email, password: hash, is_admin });

    const operationOK = {
      response: "NOUVEL UTILISATEUR ENREGISTRE",
      newUser,
    };

    console.log(operationOK);
    res.status(200).json(operationOK);
  } catch (error) {
    console.log("ERROR MESSAGE", error);
    return res.status(400).send(error);
  }
});

router.post("/auth/login", async (req, res) => {});

module.exports = router;

// const createUser = await sequelize
//   .query(
//     `INSERT INTO ${"`users`"} (${"`email`"}, ${"`password`"}, ${"`is_admin`"}, ${"`created_at`"})

//   VALUES

//   ('${email}', '${hash}', '${is_admin ? 1 : 0}', '${DATETIME}');
//   `
//   )
//   .then((results) => {
//     console.log(results);
//     return results;
//   })
//   .catch((err) => {
//     console.log(err);
//     throw err.errors[0].message;
//   });
