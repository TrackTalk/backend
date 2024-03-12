const { DataTypes, INTEGER } = require("sequelize");
const db = require("../db");
const User = require("./user");
const Track = require("./track")

const FavoriteTracks = db.define("favoriteTracks", {
    favoriteTracksId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    trackId: {
        type: DataTypes.INTEGER,
        references: {
            model: Track,
            key: "trackId"
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId"
        }
    }
});

module.exports = FavoriteTracks;