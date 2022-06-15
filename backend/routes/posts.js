const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;

// models
const Post = require("../models/Post");

// middleware
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
  let newPost;

  try {
    if (!req.files?.image) {
      console.log("BODY", req.fields);
      const { title, content, likes = 0, is_image = false } = req.fields;

      newPost = await Post.create({ title, content, likes, is_image: false });
    } else {
      const { title, content, likes = 0, is_image = true } = req.fields;
      const { image } = req.files;

      let pictureToUpload = image.path;
      const uploadImage = await cloudinary.uploader.upload(pictureToUpload);

      newPost = await Post.create({
        title,
        content,
        likes,
        is_image: true,
        image_url: uploadImage?.secure_url,
      });
    }

    return res.status(200).json({ message: "new post created", newPost });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).send(error);
  }
});

// SUPRESSION
router.post("/posts/delete", isAuthorized, async (req, res) => {});

// MOFIFICATIONS
router.post("/posts/modify", isAuthorized, async (req, res) => {});

// LIKES
router.post("/posts/like", isAuthorized, async (req, res) => {});

module.exports = router;
