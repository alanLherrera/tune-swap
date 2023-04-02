const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sq.define("user_id", {
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

  const mike = User.create({
      email: "mike@example.com",
      fullName: "Mike Smith",
      age: 30,
    });

    mike()
    console.log(mike)
    
User.sync().then(() => {
    console.log("User Model synced");
  });

module.exports = User;