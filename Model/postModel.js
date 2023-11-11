const Sequelize = require("sequelize");
const sequelize = require("../db/connection");

const Post = sequelize.define('Post', {
    postName: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  
  module.exports = Post;