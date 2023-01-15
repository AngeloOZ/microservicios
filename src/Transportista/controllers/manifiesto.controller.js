const { request, response } = require('express');
const Manifiesto = require('../../../models/Manifiesto');
const Usuario = require('../../../models/Usuario');
const UsuarioManifiesto2 = require('../../../models/UsuarioManifiesto2');
const Manifiesto_Productor = require('../../../models/Manifiesto_Productor');
const Manifiesto_Destinatario = require('../../../models/Manifiesto_Destinatario');
const Manifiesto_Transportista = require('../../../models/Manifiesto_Transportista');
;

async function mostrar(req = request, res = response) {
    try {
        const { id_usuario } = req.currentToken;

        const manifiestos = await UsuarioManifiesto2.findAll({
            where: { 'id_usuario': id_usuario }, include: { model: Manifiesto, include: [{model:Manifiesto_Productor,}, {model: Manifiesto_Destinatario}, {model: Manifiesto_Transportista}] }
        });

        return res.status(200).json(manifiestos);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { mostrar }