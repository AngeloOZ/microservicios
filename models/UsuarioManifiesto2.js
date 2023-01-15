const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const UsuarioManifiesto2 = sequelize.define('UsuarioManifiesto2', {
    id_usuario_manifiesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    timestamps: false,
    tableName: "UsuarioManifiesto2"
});

module.exports = UsuarioManifiesto2;