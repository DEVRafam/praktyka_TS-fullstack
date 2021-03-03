const { Sequelize } = require("sequelize");
const { database } = require("../config/config.js");
const { name, password, host, dialect, user, sequelize_logging } = database;
//
module.exports = new Sequelize(name, user, password, {
    host,
    dialect,
    logging: sequelize_logging,
});
