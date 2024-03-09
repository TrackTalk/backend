const { DataTypes } = require("sequelize");
const db = require("../db");

const Track = db.define("track", {
    spotifyId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coverPicUrl: {
        type: DataTypes.STRING,
        allowNull: false 
    }
});

module.exports = Track;