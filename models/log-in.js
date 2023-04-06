const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");


const User = sequelize.define("user_id", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  
    fullName: {
      type: DataTypes.STRING,
    },
    
    age: {
      type: DataTypes.INTEGER,
    },
  
  });


User.sync().then(() => {
    console.log("User Model synced");
  });

module.exports = User;