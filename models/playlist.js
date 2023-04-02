const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const playlist = sq.define("playlist_id",{
  songName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  playlistName: {
    type: DataTypes.STRING,
    allowNull: false,
  },


})
playlist.sync().then(() => {
  console.log("Playlist model succesfully synced")
})

module.export = playlist;