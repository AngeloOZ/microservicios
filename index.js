const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const sequelize = require('./models/database');
require("dotenv").config();
require("./models/init_relacions");
require("./models/inicializar_datos");

const app = express();
const port = process.env.PORT || 4010;

/* -------------------------------------------------------------------------- */
/*                          Funciones de middlewares                          */
/* -------------------------------------------------------------------------- */
app.use(express.json());
app.use(cookieParser());
app.use(cors())

/* -------------------------------------------------------------------------- */
/*                                    Ruteo                                   */
/* -------------------------------------------------------------------------- */
app.get('/api', (req, res) => {
    res.status(404).json({ status: 404, message: "Bad request" });
});

/* Microservicios de Auth */
app.use('/api/v1/auth', require("./src/auth/routes/auth.routes"));
app.use('/api/v1/empresa-productora', require("./src/auth/routes/eProductora.routes"));
app.use('/api/v1/empresa-destinatario', require("./src/auth/routes/eDestinatario.routes"));
app.use('/api/v1/empresa-transportista', require("./src/auth/routes/eTransportista.routes"));
app.use('/api/v1/usuario-transportista', require("./src/auth/routes/transportista.routes"));

/* Microservicios de Productor */
app.use('/api/v1/instalaciones', require("./src/Productor/routes/instalaciones.routes"));
app.use('/api/v1/aee', require("./src/Productor/routes/aee.routes"));
app.use('/api/v1/manifiesto-p1', require("./src/Productor/routes/manifiesto.routes"));

/* Microservicio de transportista */
app.use('/api/v1/obtener-manifiesto', require('./src/Transportista/routes/manifiesto.routes'));
app.use('/api/v1/manifiesto-p2', require('./src/Transportista/routes/manifiesto.routes'));


/* Microservicio de Destinatario */
app.use('/api/v1/manifiesto-p3', require('./src/Destinatario/routes/manifiesto.routes'));



/* -------------------------------------------------------------------------- */
/*                        Manejo de errores y servidor                        */
/* -------------------------------------------------------------------------- */
app.use(function (req, res, next) {
    res.status(404).json({ status: 404, message: `the url ${req.url} no found` })
});

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        // sequelize.sync({ alter: true })
        console.log(`Application is listening at port ${port}`);
    } catch (err) {
        console.error(err)
    }
});


const nodemailer = require("nodemailer");
const transporter = require('./helpers/nodemailer');


(async () => {
    try {
        console.log("Enviando...");
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "cruzc51@gmail.com, jessicamile94@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello my love?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {

    }
})