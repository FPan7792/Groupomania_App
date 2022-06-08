const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3003;

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
  console.log(`Example app listening on port ${port}`);
});
