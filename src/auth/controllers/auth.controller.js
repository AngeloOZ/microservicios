const { request, response } = require('express');
const { passwordHash, passwordVerify } = require('../../../helpers/bcrypt');
const { singToken } = require('../../../helpers/jwt');
const { printToJson } = require('../../../helpers/printToJson');
const E_Destinataria = require('../../../models/E_Destinataria');
const E_Productor = require('../../../models/E_Productor');
const E_Trasportista = require('../../../models/E_Trasportista');
const Transportista = require('../../../models/Transportista');
const Usuario = require('../../../models/Usuario');

async function obtenerUsuario(usuarioBase) {
    let usuarioLogged;

    switch (usuarioBase.id_tipo) {
        case 1: {
            const auxUser = await E_Trasportista.findOne({
                where: { id_usuario: usuarioBase.id_usuario },
                include: {
                    model: Usuario,
                    attributes: { exclude: ['contrasenia', 'id_usuario'] }
                }
            });
            const auxUserB = auxUser.dataValues.Usuario.dataValues;
            delete auxUser.dataValues.Usuario;
            usuarioLogged = { ...auxUser.dataValues, usuario: { ...auxUserB } }
            break;
        }
        case 2: {
            const auxUser = await E_Productor.findOne({
                where: { id_usuario: usuarioBase.id_usuario },
                include: {
                    model: Usuario,
                    attributes: { exclude: ['contrasenia', 'id_usuario'] }
                }
            });
            const auxUserB = auxUser.dataValues.Usuario.dataValues;
            delete auxUser.dataValues.Usuario;
            usuarioLogged = { ...auxUser.dataValues, usuario: { ...auxUserB } }
            break;
        }
        case 3: {
            const auxUser = await E_Destinataria.findOne({
                where: { id_usuario: usuarioBase.id_usuario },
                include: {
                    model: Usuario,
                    attributes: { exclude: ['contrasenia', 'id_usuario'] }
                }
            });
            const auxUserB = auxUser.dataValues.Usuario.dataValues;
            delete auxUser.dataValues.Usuario;
            usuarioLogged = { ...auxUser.dataValues, usuario: { ...auxUserB } }
            break;
        }
        case 4: {
            const auxUser = await Transportista.findOne({
                where: { id_usuario: usuarioBase.id_usuario },
                include: {
                    model: Usuario,
                    attributes: { exclude: ['contrasenia', 'id_usuario'] }
                }
            });
            const auxUserB = auxUser.dataValues.Usuario.dataValues;
            delete auxUser.dataValues.Usuario;
            usuarioLogged = { ...auxUser.dataValues, usuario: { ...auxUserB } }
            break;
        }
    }
    return usuarioLogged;
}

async function login(req = request, res = response) {
    try {
        const { username, password } = req.body;
        const requestUser = await Usuario.findOne({ where: { usuario: username } });

        if (requestUser) {
            const match = await passwordVerify(password, requestUser.contrasenia);
            if (requestUser.usuario == username && match) {
                const payloadToken = await obtenerUsuario(requestUser.dataValues);
                const token = singToken(payloadToken);
                payloadToken.token = token;
                return res.status(200).json(printToJson(200, "success", payloadToken));
            }
        }
        return res.status(404).json(printToJson(404, "El usuario o contrasenia no son correctos"));

    } catch (error) {
        res.status(500).json(printToJson(500, error.message));
    }
}

async function actualizarUsuarioBase(req = request, res = response) {
    try {
        const { id_usuario, foto_url, identificacion, nombre, correo, contrasenia } = req.body;

        const usuarioBase = await Usuario.findByPk(id_usuario);
        usuarioBase.foto_url = foto_url;
        usuarioBase.identificacion = identificacion;
        usuarioBase.nombre = nombre;
        usuarioBase.correo = correo;
        if (contrasenia && contrasenia != "") {
            pwdTemp = await passwordHash(contrasenia);
            usuarioBase.contrasenia = pwdTemp;
        }

        await usuarioBase.save();

        const payloadToken = await obtenerUsuario(usuarioBase.dataValues);
        const token = singToken(payloadToken);
        payloadToken.token = token;
        return res.status(200).json(printToJson(200, "success", payloadToken));
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

module.exports = { login, actualizarUsuarioBase }