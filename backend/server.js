require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3003;
const { Sequelize } = require("sequelize");

sequelize = new Sequelize(
  "groupomania_app",
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySQL!");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

// initialisation d'entetes
app.use(cors());

// conversion des données en JSON
app.use(express.json());

const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");

app.use(authRoutes);
app.use(postsRoutes);

// si Route inexistante
app.all("*", (req, res) => {
  res.status(404).send("Page non trouvée");
});

app.listen(port, () => {
  console.log(`Server is listenning on port ${port}`);
});
