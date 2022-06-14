const express = require("express");
const router = express.Router();

// models
const Post = require("../models/Post");

const isAuthorized = require("../middlewares/isAuthorized");

// Tout les posts
router.get("/posts", isAuthorized, async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    console.log(allPosts);
    res.status(200).json(allPosts);
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).send(error);
  }
});

// CREATION
router.post("/posts/create", isAuthorized, async (req, res) => {
  const { title, content, likes = 0, is_image } = req.body;
  console.log(req.body);

  // Wait for impl CLOUDINARY FUNC
  try {
    // const newPost = await Post.create({title, content, likes, is_image })

    res.status(200).send("CREATION OK");
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).send(error);
  }
});

// SUPRESSION
router.post("/posts/delete", isAuthorized, async (req, res) => {});

// MOFIFICATIONS
router.post("/posts/modify", isAuthorized, async (req, res) => {});

// LIKES
router.post("/posts/like", isAuthorized, async (req, res) => {});

module.exports = router;
