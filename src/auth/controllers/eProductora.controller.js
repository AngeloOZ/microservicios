const { request, response } = require('express');
const { printToJson } = require('../../../helpers/printToJson');
const E_Productor = require('../../../models/E_Productor');
const Usuario = require('../../../models/Usuario');


async function obtenerEProductoras(req = request, res = response) {
    try {
        const usuarios = await E_Productor.findAll({ include: Usuario });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function obtenerEProductorPorAtributo(req = request, res = response) {
    try {
        const { parameter, value } = req.params;
        const usuario = await E_Productor.findOne({ where: { [parameter]: value }, include: Usuario });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}


async function registrarEProductora(req = request, res = response) {
    try {
        const { usuario, contrasenia, correo, nombre, foto_url, telefono, domicilio, licencia_ambiental, estado, id_tipo, ruc } = req.body;

        const usuarioBase = await Usuario.create({
            usuario,
            contrasenia,
            correo,
            nombre,
            foto_url,
            telefono,
            domicilio,
            licencia_ambiental,
            estado,
            id_tipo
        });

        const usuarioEproductor = await E_Productor.create({
            ruc,
            id_usuario: usuarioBase.dataValues.id_usuario
        })

        return res.status(200).json(usuarioEproductor)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { obtenerEProductoras, obtenerEProductorPorAtributo, registrarEProductora }