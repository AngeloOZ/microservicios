const { request, response } = require('express');
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
        const usuario = await Transportista.findOne({ where: { [parameter]: value }, include: Usuario });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function registrar(req = request, res = response) {
    try {
        const { usuario, contrasenia, correo, nombre, foto_url, telefono, domicilio, licencia_ambiental, estado, id_tipo, cargo, tipo_auto, placa } = req.body;

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

        const usuarioTransportista = await Transportista.create({
            cargo,
            tipo_auto,
            placa,
            id_usuario: usuarioBase.dataValues.id_usuario
        })

        return res.status(200).json(usuarioTransportista)
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar(req = request, res = response) {
    try {
        const { usuario, contrasenia, correo, nombre, foto_url, telefono, domicilio, licencia_ambiental, estado, id_tipo, cargo, tipo_auto, placa, id_usuario, id_transportista } = req.body;

        const usuarioBase = await Usuario.findByPk(id_usuario);

        usuarioBase.usuario = usuario;
        usuarioBase.correo = correo;
        usuarioBase.nombre = nombre;
        usuarioBase.foto_url = foto_url;
        usuarioBase.telefono = telefono;
        usuarioBase.domicilio = domicilio;
        usuarioBase.licencia_ambiental = licencia_ambiental;
        usuarioBase.estado = estado;
        usuarioBase.id_tipo = id_tipo;
        if (contrasenia && contrasenia != "") {
            // Encriptar contraseña
            usuarioBase.contrasenia = contrasenia;
        }

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