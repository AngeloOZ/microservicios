const { request, response } = require('express');
const { Op } = require("sequelize");

const { printToJson } = require('../../../helpers/printToJson');
const Manifiesto = require('../../../models/Manifiesto');
const sequelize = require('../../../models/database');

async function reporte_manifiestos(req = request, res = response) {
    try {
        const ahora = new Date();
        const hace2meses = new Date(ahora.getFullYear(), ahora.getMonth() - 2, ahora.getDate());

        const manifiestos = await sequelize.query("SELECT COUNT(DATE_FORMAT(fecha_creacion , '%Y-%m-%d')) as 'cantidad', DATE_FORMAT(fecha_creacion , '%Y-%m-%d') as 'fecha' FROM Manifiesto WHERE fecha_creacion  BETWEEN :inicio AND :fin GROUP BY DATE_FORMAT(fecha_creacion , '%Y-%m-%d')",
            {
                replacements: { inicio: hace2meses, fin: ahora },
                type: sequelize.QueryTypes.SELECT
            })

        const data = {
            labels: [],
            datasets: [],
        }

        for (const datos of manifiestos) {
            data.labels.push(new Date(datos.fecha));
            data.datasets.push(datos.cantidad);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { reporte_manifiestos }