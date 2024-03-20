const { DataTypes } = require("sequelize");
const db = require("../db");
const Track = require("./track");

const User = db.define("users", {
    userId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,  
        allowNull: false,
    },
    profilePicUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spotifyLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true}
    },
    currentlyListeningId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Track,
            key: "trackId"
        }
    },
    spotifyProfileId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    spotifyPlaylistId:{
        type: DataTypes.STRING,
        allowNull: true,
    }
});
module.exports = User;