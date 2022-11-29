const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
    config.mysql_local.database,
    config.mysql_local.user,
    config.mysql_local.password,
    {
        host: config.mysql_local.host,
        dialect: 'mysql',
        port: config.mysql_local.port
    }
);

module.exports = sequelize;