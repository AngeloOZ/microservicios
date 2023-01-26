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
        endpoint1: process.env.MICRO_END_1 || "https://angello-midev.store/api/v1/",
        endpoint2: process.env.MICRO_END_2 || "https://angello-midev.store/api/v1/",
        endpoint3: process.env.MICRO_END_3 || "https://angello-midev.store/api/v1/",
        endpoint4: process.env.MICRO_END_4 || "https://angello-midev.store/api/v1/",
    },
    email: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        // user: "pruebaemail198@gmail.com",
        // pass: "lokera123"
        user: "reciclick.app@gmail.com",
        pass: "friizeiskejnnvmq"
    }
}