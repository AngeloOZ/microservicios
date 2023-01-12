const { request, response } = require('express');
const { passwordHash } = require('../../../helpers/bcrypt');
const { printToJson } = require('../../../helpers/printToJson');
const E_Productor = require('../../../models/E_Productor');
const Usuario = require('../../../models/Usuario');


async function mostrar(req = request, res = response) {
    try {
        const usuarios = await E_Productor.findAll({ include: Usuario });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function mostrarPorCampos(req = request, res = response) {
    try {
        const { parameter, value } = req.params;
        const usuario = await E_Productor.findAll({ where: { [parameter]: value }, include: Usuario });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function registrar(req = request, res = response) {
    try {
        const { usuario, contrasenia, correo, identificacion, id_tipo } = req.body;

        const usuarioBase = await Usuario.create({
            usuario,
            contrasenia: await passwordHash(contrasenia),
            correo,
            identificacion,
            id_tipo
        });

        const usuarioEproductor = await E_Productor.create({
            id_usuario: usuarioBase.dataValues.id_usuario
        })

        return res.status(200).json(usuarioEproductor)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar(req = request, res = response) {
    try {
        const { telefono, domicilio, licencia_ambiental, estado, id_tipo, ruc, id_usuario, id_eproductor } = req.body;

        const usuarioBase = await Usuario.findByPk(id_usuario);

        usuarioBase.telefono = telefono;
        usuarioBase.domicilio = domicilio;
        usuarioBase.licencia_ambiental = licencia_ambiental;
        usuarioBase.estado = estado;
        usuarioBase.id_tipo = id_tipo;

        await usuarioBase.save();

        const usuarioEProductor = await E_Productor.findByPk(id_eproductor);
        usuarioEProductor.ruc = ruc;
        await usuarioEProductor.save();

        return res.status(200).json(usuarioEProductor)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}



module.exports = { mostrar, mostrarPorCampos, registrar, actualizar }