const { request, response } = require('express');
const Manifiesto = require('../../../models/Manifiesto');
const Manifiesto_Destinatario = require('../../../models/Manifiesto_Destinatario');
const { printToJson } = require('../../../helpers/printToJson');

async function registrar(req = request, res = response) {
    try {
        const { diferencias_entregas, id_destinatario_alterno, fecha_destinatario_alterno, manejo, observaciones, nombre_encargado, cargo_encargado, fecha_encargado, id_manifiesto } = req.body;
        const manifiesto = await Manifiesto.findByPk(id_manifiesto);

        if (!manifiesto) {
            return res.status(404).json(printToJson(404, `Manifiesto con id: ${id_manifiesto} no existe`));
        }

        const manifiestop3 = await Manifiesto_Destinatario.create({
            diferencias_entregas,
            id_destinatario_alterno,
            fecha_destinatario_alterno,
            manejo,
            observaciones,
            nombre_encargado,
            cargo_encargado,
            fecha_encargado
        });

        await manifiestop3.save();
        manifiesto.id_manifiesto_destinatario = manifiestop3.dataValues.id_manifiesto_destinatario;
        await manifiesto.save();
        return res.status(200).json(printToJson(200, "Tercera parte del manifiesto agregada", manifiesto));
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { registrar }