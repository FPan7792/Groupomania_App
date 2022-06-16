const cloudinary = require("cloudinary").v2;

// models
const Post = require("../models/Post");

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

  console.log("REQ", req.fields);

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
    return res.status(400).send(error);
  }
};
// SUPRESSION
exports.deletePost = async (req, res) => {
  const { post_id, user_id } = req.fields;
  console.log("LOGTEST", post_id);

  try {
    if (post_id) {
      const postToDelete = await Post.findOne({
        where: { post_id },
      });

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
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

// exports.modifyPost = async (req, res) => {};

// exports.likePost = async (req, res) => {};
