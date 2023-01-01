const { request, response } = require('express');
const { printToJson } = require('../../../helpers/printToJson');
const E_Productor = require('../../../models/E_Productor');
const Instalaciones = require('../../../models/Instalaciones');
const AEE = require('../../../models/AEE');
AEE


async function mostrar(req = request, res = response) {
    try {
        const usuarios = await AEE.findAll({ include: { all: true, nested: true } });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error));
    }
}

async function mostrarPorCampos(req = request, res = response) {
    try {
        const { parameter, value } = req.params;
        const usuario = await AEE.findOne({ where: { [parameter]: value }, include: Instalaciones });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function mostrarAEEInstalacion(req = request, res = response) {
    try {
        const { id } = req.params;
        const aees = await AEE.findAll({ where: { "id_instalacion": id } });
        res.status(200).json(aees);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function mostrarAEEProductor(req = request, res = response) {
    try {
        const payload = req.currentToken;
        const instalaciones = await Instalaciones.findAll({ where: { "id_eproductor": payload.id_eproductor } });
        let listadoAEES = [];
        for (const instalacion of instalaciones) {
            const aees = await AEE.findAll({ where: { "id_instalacion": instalacion.id_instalacion } });
            listadoAEES = [...listadoAEES, ...aees];
        }
        return res.json(listadoAEES);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}


async function registrar(req = request, res = response) {
    try {
        const { nombre, codigo, capacidad_contenedor, tipo_contenedor, cantidad, unidades, estado, id_instalacion } = req.body;

        const aee = await AEE.create({ nombre, codigo, capacidad_contenedor, tipo_contenedor, cantidad, unidades, estado, id_instalacion });

        return res.status(200).json(aee);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar(req = request, res = response) {
    try {
        const { nombre, codigo, capacidad_contenedor, tipo_contenedor, cantidad, unidades, estado, id_instalacion, id_aee } = req.body;

        const aee = await AEE.findByPk(id_instalacion);

        aee.nombre = nombre;
        aee.codigo = codigo;
        aee.capacidad_contenedor = capacidad_contenedor;
        aee.tipo_contenedor = tipo_contenedor;
        aee.cantidad = cantidad;
        aee.unidades = unidades;
        aee.estado = estado;
        aee.id_instalacion = id_instalacion;
        aee.id_aee = id_aee;

        await aee.save();

        return res.status(200).json(aee);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}

async function actualizar2(req = request, res = response) {
    try {
        const campos = req.body;
        const aee = await AEE.findByPk(campos.id_aee);
        delete campos.id_aee;
        aee.update(campos);

        return res.status(200).json(aee);
    } catch (error) {
        res.status(500).json(printToJson(500, error.message, error))
    }
}


module.exports = { mostrar, mostrarPorCampos, mostrarAEEInstalacion, mostrarAEEProductor, registrar, actualizar, actualizar2 }