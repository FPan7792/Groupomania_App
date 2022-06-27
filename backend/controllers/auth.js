const argon2 = require("argon2");
// generation d'un webToken
const jwt = require("jsonwebtoken");
// models
const User = require("../models/User");

// ROUTE SIGNUP
exports.signup = async (req, res) => {
  const { email, password, is_admin } = req.fields;

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
};

// ROUTE LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.fields;
  console.log("FIELDS", req.fields);

  try {
    const targetedUser = await User.findOne({ where: { email } });
    if (targetedUser === null) {
      console.log("Not found!");
      res.status(400).json({
        message: "Aucun utlisateur ne correspond à votre requête",
      });
    } else {
      const verifyPassword = await argon2.verify(
        targetedUser.password,
        password
      );

      if (verifyPassword) {
        const username = targetedUser.email.split("@")[0];

        return res.status(200).json({
          userId: targetedUser.user_id,
          is_admin: targetedUser.is_admin ? true : false,
          username,
          token: jwt.sign(
            { userId: targetedUser.user_id },
            process.env.UUID_TOKEN_GENERATOR,
            {
              expiresIn: "48h",
            }
          ),
        });
      } else {
        console.log("Accès refusé");
        res.status(401).json({ message: "Mauvais email ou password" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
