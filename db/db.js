require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = new Sequelize(process.env.POSTGRES_URL , {
    logging: false,
    dialectModule: require('pg'),
});
module.exports = db;