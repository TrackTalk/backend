const { DataTypes } = require("sequelize");
const db = require("../db");
const User = require("./user");
const Post = require( "./post" );

const Like = db.define("likes", {
    likeId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { 
            model: User,
            key:"userId"
        }
    },
    postId : {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: "postId"
        }
    }
});
module.exports =  Like;