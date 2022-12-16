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
        host: process.env.MYSQL_HOST || 'db-mysql-nyc1-15127-do-user-12907577-0.b.db.ondigitalocean.com',
        user: process.env.MYSQL_USER || 'pruebas_root',
        password: process.env.MYSQL_PASS || 'AVNS_ovk5bOnREAOquWiurEn',
        database: process.env.MYSQL_DB || 'pruebas_microservicio',
        port: process.env.MYSQL_PORT || '25060',
    },
    mysql_local: {
        host: process.env.MYSQL_HOST_LOCAL || 'localhost',
        user: process.env.MYSQL_USER_LOCAL || 'root',
        password: process.env.MYSQL_PASS_LOCAL || "",
        database: process.env.MYSQL_DB_LOCAL || 'recicick',
        port: process.env.MYSQL_PORT_LOCAL || '3306',
    },
}