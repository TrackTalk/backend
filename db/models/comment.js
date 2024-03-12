const { DataTypes } = require("sequelize");
const db = require("../db");
const User = require( "./user" );
const Post = require( "./post" );

const Comment = db.define("comments", {
    commentId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { 
            model: User,
            key: "userId"
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: "postId"
        }
    }
});

module.exports = Comment;