const { Sequelize, Models } = require("sequelize");
const dotenv = require('dotenv').config({path:'../.env'})


const sequelize = new Sequelize(
  database = process.env.DATABASE, 
  username = process.env.DB_USER, 
  password = process.env.PASSWORD, 
  {
  host: process.env.HOST,
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  },
  dialect: 'postgres' 
});




const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
   
  };
  

  module.exports = {  sequelize, testDbConnection };