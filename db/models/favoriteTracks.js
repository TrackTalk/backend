const { DataTypes } = require("sequelize");
const db = require("../db");

const FavoriteTracks = db.define("favoriteTracks", {
    favoriteTracksId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

module.exports = FavoriteTracks;