const { Sequelize, Models } = require("sequelize");



const sequelize = new Sequelize(
  database = process.env.DATABASE, 
  username = process.env.USER, 
  password = process.env.PASSWORD, 
  {
  host: 'localhost',
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
  

  module.exports = { sq: sequelize, testDbConnection };