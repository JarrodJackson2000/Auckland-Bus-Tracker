"use strict";
require("dotenv").config(); // Load environment variables
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Add MySQL port
    dialect: "mysql",
    pool: {
      max: 10, // Maximum number of connections in the pool
      min: 0, // Minimum number of connections in the pool
      acquire: 30000, // Maximum time (in ms) to acquire a connection
      idle: 10000, // Maximum time (in ms) a connection can be idle
    },
  }
);

const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Successful connection to MySQL Database: ${process.env.DB_NAME}`
    );
  } catch (error) {
    console.error("Unable to connect to MySQL database:", error);
    process.exit(1); // Terminate the process on connection failure
  }
};

connectMysql();

module.exports = {
  Sequelize: sequelize,
};
