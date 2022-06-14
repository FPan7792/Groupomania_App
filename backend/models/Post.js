const { DataTypes } = require("sequelize");

const Post = sequelize.define(
  "posts",
  {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    is_image: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { tableName: "posts" }
);

if (Post !== sequelize.models.posts) {
  (async () => {
    await Post.sync({ force: true });
  })()
    .then(() => {
      console.log("Table POST was just updated ! ");
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

module.exports = Post;
