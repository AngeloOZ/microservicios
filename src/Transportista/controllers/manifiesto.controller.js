const { request, response } = require('express');
const Manifiesto = require('../../../models/Manifiesto');
const Usuario = require('../../../models/Usuario');
const UsuarioManifiesto2 = require('../../../models/UsuarioManifiesto2');
const Manifiesto_Productor = require('../../../models/Manifiesto_Productor');
const Manifiesto_Destinatario = require('../../../models/Manifiesto_Destinatario');
const Manifiesto_Transportista = require('../../../models/Manifiesto_Transportista');
const { printToJson } = require('../../../helpers/printToJson');
const Instalaciones = require('../../../models/Instalaciones');
const { default: axios } = require('axios');
const config = require('../../../config');


async function mostrar(req = request, res = response) {
    try {
        const { id_usuario } = req.currentToken;

        const manifiestos = await UsuarioManifiesto2.findAll({
            where: { 'id_usuario': id_usuario }, include: { model: Manifiesto, include: [{ model: Manifiesto_Productor, }, { model: Manifiesto_Destinatario }, { model: Manifiesto_Transportista }] }
        });

        return res.status(200).json(manifiestos);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function mostrarPorId(req = request, res = response) {
    try {
        const { id } = await req.params;
        const token = req.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.defaults.baseURL = config.microservicio.endpoint2;

        const manifiesto = await UsuarioManifiesto2.findByPk(id, {
            include: {
                model: Manifiesto,
                include: [
                    {
                        model: Manifiesto_Productor,
                        include: {
                            model: Instalaciones
                        }
                    },
                    {
                        model: Manifiesto_Destinatario
                    },
                    {
                        model: Manifiesto_Transportista
                    }]
            }
        });
        const idInstalacion = manifiesto.dataValues.Manifiesto?.Manifiesto_Productor?.id_instalacion;

        if (idInstalacion) {
            const { data: aees } = await axios.get(`aee/instalacion/${idInstalacion}`);
            manifiesto.dataValues.Manifiesto.Manifiesto_Productor.Instalacione.dataValues.aees = aees;
        }
        return res.status(200).json(manifiesto);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function registrar(req = request, res = response) {
    try {
        const { punto_salida, punto_llegada, autorizacion, fecha_embarque, ruta_transporte, carreteras, id_transportista, id_manifiesto } = req.body;
        const manifiesto = await Manifiesto.findByPk(id_manifiesto);

        if (!manifiesto) {
            return res.status(404).json(printToJson(404, `Manifiesto con id: ${id_manifiesto} no existe`));
        }

        const manifiestop2 = await Manifiesto_Transportista.create({
            punto_salida,
            punto_llegada,
            autorizacion,
            fecha_embarque,
            ruta_transporte,
            carreteras,
            id_transportista,
        });

        await manifiestop2.save();
        manifiesto.id_manifiesto_transportista = manifiestop2.dataValues.id_manifiesto_transportista;
        await manifiesto.save();
        return res.status(200).json(printToJson(200, "Segunda parte del manifiesto agregada", manifiesto));
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { mostrar, mostrarPorId, registrar }