const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Playlist = sequelize.define("playlist_id",{
  songName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  playlistName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  songHash: {
    type: DataTypes.STRING,
  },
  playlistHash: {
    type: DataTypes.STRING,
  },


})
Playlist.sync().then(() => {
  console.log("Playlist model succesfully synced")
})

module.exports = Playlist;