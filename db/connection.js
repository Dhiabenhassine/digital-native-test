const { Sequelize } = require("sequelize");
require("dotenv").config(); 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

sequelize.sync().then(() => console.log("db connected"));

sequelize
  .authenticate()
  .then(() => {
    console.log("connection has been successfully");
  })
  .catch((err) => {
    console.log(err, "unable to connect to the db");
  });

module.exports = sequelize;
