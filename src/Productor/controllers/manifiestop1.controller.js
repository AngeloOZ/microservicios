const { default: axios } = require('axios');
const { request, response } = require('express');

const config = require('../../../config');
const { printToJson } = require('../../../helpers/printToJson');

const sequelize = require('../../../models/database');
const Manifiesto = require('../../../models/Manifiesto');
const UsuarioManifiesto2 = require('../../../models/UsuarioManifiesto2');
const Manifiesto_Productor = require('../../../models/Manifiesto_Productor');


async function registrar(req = request, res = response) {
    const transaction = await sequelize.transaction();
    try {
        const payloadToken = req.currentToken;
        const token = req.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const { n_registro, n_manifiesto, pagina, instrucciones_especiales, nombre_productor, cargo_productor, correo_productor, telefono_productor, numero_resolutivo, fecha_salida, id_instalacion, id_edestinataria, id_etrasportista } = req.body;

        const { data: [empDestinatario] } = await axios.get(`${config.microservicio.endpoint1}empresa-destinatario/campo/id_edestinataria/${id_edestinataria}`);
        if (!empDestinatario) {
            await transaction.rollback();
            return res.status(404).json(printToJson(404, `No existe almacenamiento con id: ${id_edestinataria}`));
        }

        const { data: [empTransportista] } = await axios.get(`${config.microservicio.endpoint1}empresa-transportista/campo/id_etrasportista/${id_etrasportista}`);
        if (!empTransportista) {
            await transaction.rollback();
            return res.status(404).json(printToJson(404, `No existe empresa transportista con id: ${id_edestinataria}`));
        }

        const manifiestoProductor = await Manifiesto_Productor.create({
            n_registro,
            n_manifiesto,
            pagina,
            instrucciones_especiales,
            nombre_productor,
            cargo_productor,
            correo_productor,
            telefono_productor,
            numero_resolutivo,
            fecha_salida,
            id_instalacion
        });

        const manifiestoBase = await Manifiesto.create({
            fase: 2,
            estado: 1,
            id_manifiesto_productor: manifiestoProductor.dataValues.id_manifiesto_productor,
        })

        await UsuarioManifiesto2.create({
            id_usuario: payloadToken.usuario.id_usuario,
            id_manifiesto: manifiestoBase.dataValues.id_manifiesto
        })

        await UsuarioManifiesto2.create({
            id_usuario: empDestinatario.Usuario.id_usuario,
            id_manifiesto: manifiestoBase.dataValues.id_manifiesto
        })

        await UsuarioManifiesto2.create({
            id_usuario: empTransportista.Usuario.id_usuario,
            id_manifiesto: manifiestoBase.dataValues.id_manifiesto
        })

        await transaction.commit();
        return res.status(201).json(printToJson(201, "Primera parte de manifiesto creada"));
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json(printToJson(500, error.message, error))
    }
}


module.exports = { registrar }