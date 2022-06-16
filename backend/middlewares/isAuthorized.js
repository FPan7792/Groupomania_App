// gestion du web token
const jwt = require("jsonwebtoken");

// middleware d'authentification TOKEN
const isAuthorized = async (req, res, next) => {
  const getAuthorization =
    req.headers.authorization?.replace("Bearer ", "") || null;

  //   res.send("OK");

  if (getAuthorization) {
    try {
      await jwt.verify(
        getAuthorization,
        process.env.UUID_TOKEN_GENERATOR,
        (e, decoded) => {
          if (e) {
            throw e;
          }
          console.log("DECODED1", decoded);
          const parsedToken = decoded?.userId;

          if (!parsedToken) {
            console.log("Données d'acces incorrect");
            throw new Error(
              "Données d'acces incorrect. modifications impossibles"
            );
          } else {
            console.log("AUTHORIZED OK");
            req.fields.user_id = decoded.userId;
            next();
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(403).send(error.message);
    }
  } else {
    res.status(401).send("Entête de requètes manquantes");
  }
};

module.exports = isAuthorized;
