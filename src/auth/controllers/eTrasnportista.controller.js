const { request, response } = require('express');
const { printToJson } = require('../../../helpers/printToJson');
const E_Trasportista = require('../../../models/E_Trasportista');
const Usuario = require('../../../models/Usuario');

async function mostrar(req = request, res = response) {
    try {
        const usuarios = await E_Trasportista.findAll({ include: Usuario });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error));
    }
}


async function mostrarPorCampos(req = request, res = response) {
    try {
        const { parameter, value } = req.params;
        const usuario = await E_Trasportista.findOne({ where: { [parameter]: value }, include: Usuario });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}


async function registrar(req = request, res = response) {
    try {
        const { usuario, contrasenia, correo, nombre, foto_url, telefono, domicilio, licencia_ambiental, estado, id_tipo, plan_contingencia, licencia_policia } = req.body;

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

        const usuarioETransportista = await E_Trasportista.create({
            plan_contingencia,
            licencia_policia,
            id_usuario: usuarioBase.dataValues.id_usuario
        })

        return res.status(200).json(usuarioETransportista)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { mostrar, mostrarPorCampos, registrar }