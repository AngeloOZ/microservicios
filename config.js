require("dotenv").config();

module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || '',
        port: process.env.MYSQL_PORT || '',
    },
    microservicio: {
        endpoint1: process.env.MICRO_END_1 || "http://localhost:4010/api/v1/",
        endpoint2: process.env.MICRO_END_2 || "http://localhost:4010/api/v1/",
        endpoint3: process.env.MICRO_END_3 || "http://localhost:4010/api/v1/",
        endpoint4: process.env.MICRO_END_4 || "http://localhost:4010/api/v1/",
    }
}