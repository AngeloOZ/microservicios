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
            where: { 'id_usuario': id_usuario },
            include: {
                model: Manifiesto,
            }
        });

        for (const manifiesto of manifiestos) {
            const query = await UsuarioManifiesto2.findAll({
                where: {
                    id_manifiesto: manifiesto.id_manifiesto,
                },
                include: {
                    model: Usuario,
                    attributes: { exclude: ['contrasenia', 'foto_url', 'estado', 'id_tipo'] }
                },
                attributes: { exclude: ['id_usuario_manifiesto', 'id_manifiesto'] }
            })
            manifiesto.dataValues.Manifiesto.dataValues.usuarios = query;

        }

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
        // axios.defaults.baseURL = config.microservicio.endpoint2;

        const manifiesto = await Manifiesto.findByPk(id, {
            include: [
                {
                    model: Manifiesto_Productor,
                    include: {
                        model: Instalaciones,
                    }
                },
                {
                    model: Manifiesto_Destinatario
                },
                {
                    model: Manifiesto_Transportista
                }]
        });

        if (!manifiesto) {
            return res.status(404).json(printToJson(404, "No se ha encontrado un manifiesto con ese id"))
        }

        const idManifiesto = manifiesto.dataValues.Manifiesto_Productor.dataValues.id_instalacion;
        const { data: aees } = await axios.get(config.microservicio.endpoint2 + 'aee/instalacion/' + idManifiesto);
        manifiesto.dataValues.Manifiesto_Productor.dataValues.Aees = aees;

        const usuarios = await UsuarioManifiesto2.findAll({
            where: { id_manifiesto: manifiesto.dataValues.id_manifiesto },
        })

        axios.defaults.baseURL = config.microservicio.endpoint1;
        for (const user of usuarios) {
            switch (user.dataValues.id_tipo_usuario) {
                case 1: {
                    const { data: usuario } = await axios.get(`empresa-transportista/campo/id_usuario/${user.dataValues.id_usuario}`);
                    manifiesto.dataValues.empresa_transportista = usuario;
                    break;
                }
                case 2: {
                    const { data: usuario } = await axios.get(`empresa-productora/campo/id_usuario/${user.dataValues.id_usuario}`);
                    manifiesto.dataValues.empresa_productor = usuario;
                    break
                }
                case 3: {
                    const { data: usuario } = await axios.get(`empresa-destinatario/campo/id_usuario/${user.dataValues.id_usuario}`);
                    manifiesto.dataValues.empresa_destinatario = usuario;
                    break;
                }
            }
        }

        const idTransportista = manifiesto.dataValues.Manifiesto_Transportistum.dataValues.id_transportista;
        const { data: transportista } = await axios.get(`usuario-transportista/campo/id_transportista/${idTransportista}`);
        manifiesto.dataValues.usuario_transportista = transportista;

        let usuarioDestAlt = null;
        const idDestinoAlterno = manifiesto.dataValues.Manifiesto_Destinatario.dataValues.id_edestinataria_alterno;
        if (idDestinoAlterno) {
            const { data: usuario } = await axios.get(`empresa-destinatario/campo/id_edestinataria/${idDestinoAlterno}`);
            usuarioDestAlt = usuario;
        }
        manifiesto.dataValues.destinatario_alterno= usuarioDestAlt;

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