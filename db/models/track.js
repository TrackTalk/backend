const { DataTypes } = require("sequelize");
const db = require("../db");

const Track = db.define("tracks", {
    trackId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
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
        type: DataTypes.TEXT,
        allowNull: false
    },
    coverPicUrl: {
        type: DataTypes.TEXT,
        allowNull: false 
    }
});

module.exports = Track;