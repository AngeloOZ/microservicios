const { request, response } = require('express');
const sequelize = require('../../../models/database');
const { printToJson } = require('../../../helpers/printToJson');


var models = initModels(sequelize);

function getCarriersUsers(req = request, res = response) {
    try {
        const users = models.TRANSPORTISTA.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message))
    }
}

module.exports = { getCarriersUsers }