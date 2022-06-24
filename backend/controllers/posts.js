const cloudinary = require("cloudinary").v2;

// models
const User = require("../models/User");
const Post = require("../models/Post");

// Tout les posts
exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.findAll({ order: [["createdAt", "DESC"]] });

    console.log(allPosts);
    res.status(200).json(allPosts);
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).json(error);
  }
};

// CREATION
exports.createPost = async (req, res) => {
  let newPost;

  try {
    if (!req.files.image) {
      const {
        title,
        content,
        likes = 0,
        is_image = false,
        user_id,
      } = req.fields;

      newPost = await Post.create({
        title,
        content,
        likes,
        is_image: false,
        owner_id: user_id,
        usersIds_likes: JSON.stringify([]),
      });
      return res.status(200).json({ message: "new post created", newPost });
    } else {
      const {
        title,
        content,
        likes = 0,
        is_image = true,
        user_id,
      } = req.fields;
      const { image } = req.files;

      let pictureToUpload = image.path;
      const uploadImage = await cloudinary.uploader.upload(pictureToUpload, {
        folder: `/groupomania_app/user_1`,
      });

      newPost = await Post.create({
        title,
        content,
        likes,
        is_image: true,
        image_url: uploadImage?.secure_url,
        owner_id: user_id,
        usersIds_likes: JSON.stringify([]),
      });
    }

    return res.status(200).json({ message: "new post created", newPost });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).json({ error });
  }
};

// SUPRESSION
exports.deletePost = async (req, res) => {
  const { post_id, user_id } = req.fields;
  try {
    const USER = await User.findOne({ where: { user_id } });

    const postToDelete = await Post.findOne({
      where: { post_id: post_id },
    });
    if (postToDelete) {
      if (USER.is_admin || postToDelete.owner_id === USER.user_id) {
        // refactoriser
        const databaseId = postToDelete.image_url.split("/");
        const id = databaseId[databaseId.length - 1].split(".");
        console.log("ID", id[0]);

        const dtbPostDeletionFeedback = await postToDelete.destroy();

        if (postToDelete.is_image && postToDelete.image_url !== "") {
          const dtbMediaDeletionFeedback =
            await cloudinary.api.delete_resources_by_prefix(
              `groupomania_app/user_${user_id}/${id[0]}`
            );

          return res.status(200).json({
            message: "le post à été supprimé",
            dtbPostDeletionFeedback,
            dtbMediaDeletionFeedback,
          });
        } else
          return res.status(200).json({
            message: "le post à été supprimé",
            dtbPostDeletionFeedback,
          });
      } else
        return res.status(400).json({
          message: " Erreur. Suppression non autorisée",
        });
    } else return res.status(400).json({ message: "Erreur: post introuvable" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

// MODIFICATION
exports.modifyPost = async (req, res) => {
  try {
    const { post_id, user_id } = req.fields;
    const USER = await User.findOne({ where: { user_id } });
    const postToModify = await Post.findOne({ where: { post_id } });

    if (USER.is_admin || postToModify.owner_id === USER.user_id) {
      postToModify.set(req.fields);
      const finalModifiedPost = await postToModify.save();

      res.status(200).json({ finalModifiedPost });
    } else
      return res
        .status(400)
        .json({ message: "Erreur. modification non autorisée" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error });
  }
};

// LIKES
exports.likePost = async (req, res) => {
  try {
    const { post_id, usersIds_likes } = req.fields;

    console.log("RF", req.fields);
    const postToManageLike = await Post.findOne({ where: { post_id } });

    postToManageLike.set({
      likes: JSON.parse(usersIds_likes).length,
      usersIds_likes,
    });
    const finalModifiedPost = await postToManageLike.save();

    res.status(200).json({ finalModifiedPost });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error });
  }
};
