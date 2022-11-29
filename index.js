const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
require("dotenv").config();
const sequelize = require('./models/database');
require("./models/init_relacions");

const app = express();
const port = process.env.PORT || 4010;

/* -------------------------------------------------------------------------- */
/*                          Funciones de middlewares                          */
/* -------------------------------------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

/* -------------------------------------------------------------------------- */
/*                                    Ruteo                                   */
/* -------------------------------------------------------------------------- */
app.get('/api', (req, res) => {
    res.status(404).json({ status: 404, message: "Bad request" });
});

// app.use('/api/v1/usuarios-transportistas', require("./src/auth/routes/usuarioTransportsta.routes"));

/* -------------------------------------------------------------------------- */
/*                        Manejo de errores y servidor                        */
/* -------------------------------------------------------------------------- */
app.use(function (req, res, next) {
    res.status(404).json({ status: 404, message: `the url ${req.url} no found` })
});

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        sequelize.sync({alter: true})
        console.log(`Application is listening at port ${port}`);
    } catch (err) {
        console.error(err)
    }
});