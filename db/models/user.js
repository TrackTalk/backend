const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
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
    loginMthd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currentlyListeningId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    spotifyProfileId: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});
module.exports = User;