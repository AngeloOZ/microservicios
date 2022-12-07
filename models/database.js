const { Sequelize } = require("sequelize");
const config = require("../config");

let sequelize;

if(config.currentDB == "remote"){
    sequelize = new Sequelize(
        config.mysql.database,
        config.mysql.user,
        config.mysql.password,
        {
            host: config.mysql.host,
            dialect: 'mysql',
            port: config.mysql.port
        }
    );
}else{
    sequelize = new Sequelize(
        config.mysql_local.database,
        config.mysql_local.user,
        config.mysql_local.password,
        {
            host: config.mysql_local.host,
            dialect: 'mysql',
            port: config.mysql_local.port
        }
    );
}


module.exports = sequelize;