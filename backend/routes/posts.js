const express = require("express");
const router = express.Router();
const postsControllers = require("../controllers/posts");

// middleware
const isAuthorized = require("../middlewares/isAuthorized");

// Tout les posts
router.get("/posts", isAuthorized, postsControllers.getAllPosts);

// CREATION
router.post("/posts/create", isAuthorized, postsControllers.createPost);

// SUPRESSION
router.post("/posts/delete", isAuthorized, postsControllers.deletePost);

// MOFIFICATIONS;
router.post("/posts/modify", isAuthorized, postsControllers.modifyPost);

// LIKES
// router.post("/posts/like", isAuthorized, postsControllers.likePost);

module.exports = router;
