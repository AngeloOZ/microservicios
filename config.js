module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'mysql-jessicamilena.alwaysdata.net',
        user: process.env.MYSQL_USER || '289153_root',
        password: process.env.MYSQL_PASS || 'Milewid@6593#',
        database: process.env.MYSQL_DB || 'jessicamilena_reciclick',
        port: process.env.MYSQL_PORT || '3306',
    },
    mysql_local: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || "",
        database: process.env.MYSQL_DB || 'recicick',
        port: process.env.MYSQL_PORT || '3306',
    },
}