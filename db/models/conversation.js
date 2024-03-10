const { DataTypes } = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
});

module.exports = Conversation;