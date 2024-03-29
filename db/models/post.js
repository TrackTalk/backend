const { DataTypes } = require("sequelize");
const db = require("../db");
const User = require("./user");
const Track = require("./track")

const Post = db.define("posts", {
    postId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "userId"
        }
    },
    trackId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Track,
            key: "trackId"
        }
    },
    bodyText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    attachPhoto: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    photoUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    likesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //foreignKeys: userId, songId
    
});

module.exports = Post;