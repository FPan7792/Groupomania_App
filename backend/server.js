require("dotenv").config();

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3003;
const { Sequelize } = require("sequelize");
const formidableMiddleware = require("express-formidable");

const cloudinary = require("cloudinary").v2;

const app = express();
// envoi de données type datas
app.use(formidableMiddleware());

// conversion des données en JSON
app.use(express.json());

// initialisation d'entetes
app.use(cors());

// BDD config
sequelize = new Sequelize(
  "groupomania_app",
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
    port: process.env.DATABASE_PORT,
  }
);

// BDD connexion
try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySQL!");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

// connexion cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");

app.use(authRoutes);
app.use(postsRoutes);

// si Route inexistante
app.all("*", (req, res) => {
  res.status(404).send("Désolé, cette page n'existe pas");
});

app.listen(port, () => {
  console.log(`Server is listenning on port ${port || 3003}`);
});
