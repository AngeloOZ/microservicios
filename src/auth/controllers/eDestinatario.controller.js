const { request, response } = require('express');
const { passwordHash } = require('../../../helpers/bcrypt');
const { printToJson } = require('../../../helpers/printToJson');
const E_Destinataria = require('../../../models/E_Destinataria');
const Usuario = require('../../../models/Usuario');

async function mostrar(req = request, res = response) {
    try {
        const usuarios = await E_Destinataria.findAll({ include: Usuario });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error));
    }
}

async function mostrarPorCampos(req = request, res = response) {
    try {
        const { parameter, value } = req.params;
        const usuario = await E_Destinataria.findAll({ where: { [parameter]: value }, include: Usuario });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function registrar(req = request, res = response) {
    try {
        const { usuario, contrasenia, correo, identificacion  } = req.body;

        const usuarioBase = await Usuario.create({
            usuario,
            contrasenia: await passwordHash(contrasenia),
            correo,
            identificacion,
            id_tipo: 3
        });

        const usuarioDestinatario = await E_Destinataria.create({
            id_usuario: usuarioBase.dataValues.id_usuario
        })

        return res.status(200).json(usuarioDestinatario)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar(req = request, res = response) {
    try {
        const { telefono, domicilio, licencia_ambiental, tipo_empresa, id_usuario, id_edestinataria } = req.body;

        const usuarioBase = await Usuario.findByPk(id_usuario);

        usuarioBase.telefono = telefono;
        usuarioBase.domicilio = domicilio;
        usuarioBase.licencia_ambiental = licencia_ambiental;

        await usuarioBase.save();

        const usuarioDestinatario = await E_Destinataria.findByPk(id_edestinataria);
        usuarioDestinatario.tipo_empresa = tipo_empresa;
        await usuarioDestinatario.save();

        return res.status(200).json(usuarioDestinatario)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { mostrar, mostrarPorCampos, registrar, actualizar }