const { request, response } = require('express');
const { passwordHash } = require('../../../helpers/bcrypt');
const { printToJson } = require('../../../helpers/printToJson');
const E_Trasportista = require('../../../models/E_Trasportista');
const Usuario = require('../../../models/Usuario');
const Transportista = require('../../../models/Transportista');

async function mostrar(req = request, res = response) {
    try {
        const usuarios = await E_Trasportista.findAll({ include: Usuario });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error));
    }
}

async function mostrarPorIdEmpresaTransportista(req = request, res = response) {
    try {
        const token = req.currentToken;
        const usuarios = await Transportista.findAll({ include: Usuario, where: { id_etrasportista: token.id_etrasportista } });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error));
    }
}

async function mostrarPorCampos(req = request, res = response) {
    try {
        const { parameter, value } = req.params;
        const usuario = await E_Trasportista.findAll({ where: { [parameter]: value }, include: Usuario });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function registrar(req = request, res = response) {
    try {
        const { usuario, contrasenia, correo, identificacion } = req.body;

        const usuarioBase = await Usuario.create({
            usuario,
            contrasenia: await passwordHash(contrasenia),
            correo,
            identificacion,
            id_tipo: 1
        });

        const usuarioETransportista = await E_Trasportista.create({
            id_usuario: usuarioBase.dataValues.id_usuario
        })

        return res.status(200).json(usuarioETransportista)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar(req = request, res = response) {
    try {
        const { telefono, domicilio, licencia_ambiental, plan_contingencia, licencia_policia, id_usuario, id_etransportista } = req.body;

        const usuarioBase = await Usuario.findByPk(id_usuario);

        usuarioBase.telefono = telefono;
        usuarioBase.domicilio = domicilio;
        usuarioBase.licencia_ambiental = licencia_ambiental;

        await usuarioBase.save();

        const usuarioETransportista = await E_Trasportista.findByPk(id_etransportista);
        usuarioETransportista.plan_contingencia = plan_contingencia;
        usuarioETransportista.licencia_policia = licencia_policia;
        await usuarioETransportista.save();

        return res.status(200).json(usuarioETransportista)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { mostrar, mostrarPorIdEmpresaTransportista, mostrarPorCampos, registrar, actualizar }