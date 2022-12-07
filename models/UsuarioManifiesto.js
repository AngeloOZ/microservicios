const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const UsuarioManifiesto = sequelize.define('UsuarioManifiesto', {
    id_usuario_manifiesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    timestamps: false,
    tableName: "UsuarioManifiesto"
});

module.exports = UsuarioManifiesto;