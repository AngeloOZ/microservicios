require("dotenv").config();

module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    currentDB: "remote",
    mysql: {
        // host: process.env.MYSQL_HOST || 'mysql-jessicamilena.alwaysdata.net',
        // user: process.env.MYSQL_USER || '289153_root',
        // password: process.env.MYSQL_PASS || 'Milewid@6593#',
        // database: process.env.MYSQL_DB || 'jessicamilena_reciclick',
        // port: process.env.MYSQL_PORT || '3306',
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || '',
        port: process.env.MYSQL_PORT || '',
    },
    mysql_local: {
        host: process.env.MYSQL_HOST_LOCAL || 'localhost',
        user: process.env.MYSQL_USER_LOCAL || 'root',
        password: process.env.MYSQL_PASS_LOCAL || "",
        database: process.env.MYSQL_DB_LOCAL || 'recicick',
        port: process.env.MYSQL_PORT_LOCAL || '3306',
    },
    microservicio: {
        auth: "http://localhost:4010/api/v1/"
    }
}