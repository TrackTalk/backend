const { DataTypes } = require("sequelize");
const db = require("../db");
const User = require("./user");

const Conversation = db.define("conversations", {
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user1Id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId"
        }
    },
    user2Id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId"
        } 
    }
});

module.exports = Conversation;