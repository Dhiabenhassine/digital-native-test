const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const User = sequelize.define(
  "User",
  {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
