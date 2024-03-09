const { Sequelize } = require("sequelize");
const db = new Sequelize(process.env.POSTGRES_URL + "?sslmode=require", {
    logging: false,
    dialectModule: require('pg'),
});
module.exports = db;