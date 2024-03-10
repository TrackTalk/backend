const { DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
    postId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
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
        type: DataTypes.STRING,
        allowNull: true,
    },
    likesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //foreignKeys: userId, songId
    
});

module.exports = Post;