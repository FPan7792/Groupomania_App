const { DataTypes } = require("sequelize");
const User = require("./User");

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
    usersIds_likes: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
    },
    is_image: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },

    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "posts" }
);

Post.belongsTo(User, {
  foreignKey: "owner_id",
  targetKey: "user_id",
});

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
