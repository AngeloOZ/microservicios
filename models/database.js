const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: 'mysql',
        port: config.mysql.port,
        pool: {
            max: 20,
            min: 1,
            acquire: 60000,
            idle: 10000,
        }
    }
);


module.exports = sequelize;