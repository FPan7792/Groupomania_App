const { DataTypes } = require("sequelize");
// const sequelize = new Sequelize("mysql::memory:");

const User = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      default: "",
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { tableName: "users" }
);

if (User !== sequelize.models.users) {
  (async () => {
    await User.sync({ force: true });
  })()
    .then(() => {
      console.log("Table USER was just updated ! ");
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

module.exports = User;
