const { request, response } = require('express');
const { passwordHash } = require('../../../helpers/bcrypt');
const { printToJson } = require('../../../helpers/printToJson');
const Transportista = require('../../../models/Transportista');
const Usuario = require('../../../models/Usuario');


async function mostrar(req = request, res = response) {
    try {
        const usuarios = await Transportista.findAll({ include: Usuario });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error));
    }
}

async function mostrarPorCampos(req = request, res = response) {
    try {
        const { parameter, value } = req.params;
        const usuario = await Transportista.findAll({ where: { [parameter]: value }, include: Usuario });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function registrar(req = request, res = response) {
    try {
        const token = req.currentToken;
        const { usuario, contrasenia, correo, identificacion } = req.body;

        const usuarioBase = await Usuario.create({
            usuario,
            contrasenia: await passwordHash(contrasenia),
            correo,
            identificacion,
            id_tipo: 4
        });

        const usuarioTransportista = await Transportista.create({
            id_usuario: usuarioBase.dataValues.id_usuario,
            id_etrasportista: token.id_etrasportista
        })

        return res.status(200).json(usuarioTransportista)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar(req = request, res = response) {
    try {
        const { telefono, domicilio, licencia_ambiental, cargo, tipo_auto, placa, id_usuario, id_transportista } = req.body;

        const usuarioBase = await Usuario.findByPk(id_usuario);

        usuarioBase.telefono = telefono;
        usuarioBase.domicilio = domicilio;
        usuarioBase.licencia_ambiental = licencia_ambiental;
        
        await usuarioBase.save();

        const usuarioTransportista = await Transportista.findByPk(id_transportista);
        usuarioTransportista.cargo = cargo;
        usuarioTransportista.tipo_auto = tipo_auto;
        usuarioTransportista.placa = placa;

        await usuarioTransportista.save();

        return res.status(200).json(usuarioTransportista)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { mostrar, mostrarPorCampos, registrar, actualizar }