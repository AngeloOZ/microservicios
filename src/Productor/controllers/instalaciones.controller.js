const { request, response } = require('express');
const { printToJson } = require('../../../helpers/printToJson');
const E_Productor = require('../../../models/E_Productor');
const Instalaciones = require('../../../models/Instalaciones');


async function mostrar(req = request, res = response) {
    try {
        const usuarios = await Instalaciones.findAll({ include: E_Productor });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error));
    }
}

async function mostrarPorCampos(req = request, res = response) {
    try {
        const { parameter, value } = req.params;
        const usuario = await Instalaciones.findOne({ where: { [parameter]: value }, include: E_Productor });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function registrar(req = request, res = response) {
    try {
        const { nombre_instalacion, domicilio, provincia, canton, parroquia, n_onu, telefono, estado, id_eproductor } = req.body;

        const instalacion = await Instalaciones.create({ nombre_instalacion, domicilio, provincia, canton, parroquia, n_onu, telefono, estado, id_eproductor });

        return res.status(200).json(instalacion);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
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


module.exports = { mostrar, mostrarPorCampos, registrar, actualizar, actualizar2}