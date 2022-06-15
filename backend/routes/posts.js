const express = require("express");
const app = express();

const router = express.Router();
const postsControllers = require("../controllers/posts");

const formidableMiddleware = require("express-formidable");

// envoi de données type datas
app.use(formidableMiddleware());

const cloudinary = require("cloudinary").v2;
// models
const Post = require("../models/Post");
// middleware
const isAuthorized = require("../middlewares/isAuthorized");

// Tout les posts
router.get("/posts", isAuthorized, postsControllers.getAllPosts);

// CREATION
router.post("/posts/create", isAuthorized, postsControllers.createPost);

// SUPRESSION
router.post("/posts/delete", isAuthorized, async (req, res) => {
  const { post_id } = req.body;

  console.log("LOGTEST", post_id);

  try {
    if (post_id) {
      const postToDelete = await Post.findOne({
        where: { post_id },
      });

      const databaseId = postToDelete.image_url.split("/");
      const id = databaseId[databaseId.length - 1].split(".");
      // console.log("ID", id);
      // console.log("ID1", id[0]);
      // const deletion = await postToDelete.destroy();
      // await cloudinary.api.delete_resources_by_prefix(
      //   `/groupomania_app/user_1/${id[0]}`
      // );

      console.log("DTBID", databaseId);

      return res
        .status(200)
        .json({ message: "le post à été supprimé", deletion: "deletion file" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// MOFIFICATIONS
router.post("/posts/modify", isAuthorized, async (req, res) => {});

// LIKES
router.post("/posts/like", isAuthorized, async (req, res) => {});

module.exports = router;
