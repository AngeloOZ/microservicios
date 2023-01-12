const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const sequelize = require('./models/database');
const validateToken = require('./middlewares/validateToken');
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