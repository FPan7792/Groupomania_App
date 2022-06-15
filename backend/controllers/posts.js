const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");

// envoi de données type datas
app.use(formidableMiddleware());

const cloudinary = require("cloudinary").v2;

// models
const Post = require("../models/Post");

// middleware
const isAuthorized = require("../middlewares/isAuthorized");

// Tout les posts
exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    res.status(200).json(allPosts);
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).send(error);
  }
};

// CREATION
exports.createPost = async (req, res) => {
  let newPost;

  try {
    if (!req.fields?.image) {
      console.log("BODY", req.body);
      const { title, content, likes = 0, is_image = false } = req.body;

      newPost = await Post.create({ title, content, likes, is_image: false });
    } else {
      const { title, content, likes = 0, is_image = true } = req.fields;
      const { image } = req.files;

      let pictureToUpload = image.path;
      // recupérer le num user dans MIDDLEWARE
      const uploadImage = await cloudinary.uploader.upload(pictureToUpload, {
        folder: `/groupomania_app/user_1`,
      });

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
};
