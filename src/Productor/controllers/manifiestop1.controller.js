const { request, response } = require('express');
const { printToJson } = require('../../../helpers/printToJson');
const E_Productor = require('../../../models/E_Productor');
const Instalaciones = require('../../../models/Instalaciones');
const Manifiesto_Productor = require('../../../models/Manifiesto_Productor');
const Manifiesto = require('../../../models/Manifiesto');
const UsuarioManifiesto = require('../../../models/UsuarioManifiesto');
const { default: axios } = require('axios');
const config = require('../../../config');
const sequelize = require('../../../models/database');


async function mostrar(req = request, res = response) {
    try {
        const { id_eproductor } = req.currentToken;

        const intalaciones = await Instalaciones.findAll({ where: { id_eproductor }, include: E_Productor });
        if (intalaciones.length != 0) {
            return res.status(200).json(intalaciones);
        } else {
            return res.status(404).json(printToJson(404, "No se ha encontrado instalaciones"));
        }
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error));
    }
}

async function mostrarPorCampos(req = request, res = response) {
    try {
        const { id_eproductor } = req.currentToken;
        const { parameter, value } = req.params;
        const intalaciones = await Instalaciones.findAll({ where: { [parameter]: value, id_eproductor }, include: E_Productor });

        if (intalaciones.length != 0) {
            return res.status(200).json(intalaciones);
        } else {
            return res.status(404).json(printToJson(404, "No se ha encontrado instalaciones"));
        }
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function registrar(req = request, res = response) {
    const transaction = await sequelize.transaction();
    try {
        const payloadToken = req.currentToken;
        const token = req.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const { n_registro, n_manifiesto, pagina, instrucciones_especiales, nombre_productor, cargo_productor, correo_productor, telefono_productor, numero_resolutivo, fecha_salida, id_edestinataria, id_etrasportista } = req.body;

        const { data: [empDestinatario] } = await axios.get(`${config.microservicio.auth}empresa-destinatario/campo/id_edestinataria/${id_edestinataria}`);
        if (!empDestinatario) {
            await transaction.rollback();
            return res.status(404).json(printToJson(404, `No existe almacenamiento con id: ${id_edestinataria}`));
        }

        const { data: [empTransportista] } = await axios.get(`${config.microservicio.auth}empresa-transportista/campo/id_etrasportista/${id_etrasportista}`);
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
            fecha_salida
        });

        const manifiestoBase = await Manifiesto.create({
            fase: 2,
            estado: 1,
            id_manifiesto_productor: manifiestoProductor.dataValues.id_manifiesto_productor,
        })

        await UsuarioManifiesto.create({
            UsuarioIdUsuario: payloadToken.usuario.id_usuario,
            ManifiestoIdManifiesto: manifiestoBase.dataValues.id_manifiesto
        })

        await UsuarioManifiesto.create({
            UsuarioIdUsuario: empDestinatario.Usuario.id_usuario,
            ManifiestoIdManifiesto: manifiestoBase.dataValues.id_manifiesto
        })

        await UsuarioManifiesto.create({
            UsuarioIdUsuario: empTransportista.Usuario.id_usuario,
            ManifiestoIdManifiesto: manifiestoBase.dataValues.id_manifiesto
        })

        await transaction.commit();
        return res.status(201).json(printToJson(201, "Primera parte de manifiesto creada"));
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar(req = request, res = response) {
    try {
        const { nombre_instalacion, domicilio, provincia, canton, parroquia, n_onu, telefono, estado, id_eproductor, id_instalacion } = req.body;

        const instalacion = await Instalaciones.findByPk(id_instalacion);

        instalacion.nombre_instalacion = nombre_instalacion;
        instalacion.domicilio = domicilio;
        instalacion.provincia = provincia;
        instalacion.canton = canton;
        instalacion.parroquia = parroquia;
        instalacion.n_onu = n_onu;
        instalacion.telefono = telefono;
        instalacion.estado = estado;
        instalacion.id_eproductor = id_eproductor;

        await instalacion.save();

        return res.status(200).json(instalacion);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar2(req = request, res = response) {
    try {
        const campos = req.body;
        const instalacion = await Instalaciones.findByPk(campos.id_instalacion);
        delete campos.id_instalacion;
        instalacion.update(campos);

        return res.status(200).json(instalacion);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}


module.exports = { mostrar, mostrarPorCampos, registrar, actualizar, actualizar2 }