const { request, response } = require('express');

const { printToJson } = require('../../../helpers/printToJson');
const Manifiesto = require('../../../models/Manifiesto');
const sequelize = require('../../../models/database');
const UsuarioManifiesto2 = require('../../../models/UsuarioManifiesto2');
const Manifiesto_Productor = require('../../../models/Manifiesto_Productor');
const axios = require('axios');
const config = require('../../../config');

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

async function reporte_toneladas_aee(req = request, res = response) {
    try {
        const { id_usuario } = req.currentToken;
        const token = req.token;

        const manifiestos = await UsuarioManifiesto2.findAll({
            where: { id_usuario },
            include: {
                model: Manifiesto,
                include: Manifiesto_Productor
            }
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.baseURL = config.microservicio.endpoint2;

        const result = {
            labels: [],
            datasets: [],
        }


        for (const manifiesto of manifiestos) {
            const id = manifiesto.Manifiesto.Manifiesto_Productor.id_instalacion;
            const { data: aeees } = await axios.get(`aee/instalacion/${id}`);

            result.labels.push(manifiesto.id_manifiesto);
            const toneladas = aeees.reduce((accumulator, currentValue) => accumulator + currentValue.unidades, 0);
            result.datasets.push(toneladas);
        }

        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }

}

module.exports = { reporte_manifiestos, reporte_toneladas_aee }