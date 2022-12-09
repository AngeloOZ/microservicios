const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const sequelize = require('./models/database');
require("dotenv").config();
require("./models/init_relacions");
// require("./models/inicializar_datos");

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

app.use('/api/v1/empresa-productora', require("./src/auth/routes/eProductora.routes"));

/* -------------------------------------------------------------------------- */
/*                        Manejo de errores y servidor                        */
/* -------------------------------------------------------------------------- */
app.use(function (req, res, next) {
    res.status(404).json({ status: 404, message: `the url ${req.url} no found` })
});

app.listen(port, async () => {
    try {
        // await sequelize.authenticate();
        // sequelize.sync({force: true})
        console.log(`Application is listening at port ${port}`);
    } catch (err) {
        console.error(err)
    }
});