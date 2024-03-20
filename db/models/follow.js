const { DataTypes } = require("sequelize");
const db = require("../db");
const User = require("./user");

const Follow = db.define("follows", {
    followId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    followerId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId"
        },
        unique: 'follower_following_unique'
    },
    followingId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId" 
        },
        unique: 'follower_following_unique'
    }
});

module.exports = Follow;
