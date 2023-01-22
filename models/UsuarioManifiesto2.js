const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const UsuarioManifiesto2 = sequelize.define('UsuarioManifiesto2', {
    id_usuario_manifiesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tipo_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: "UsuarioManifiesto2"
});

module.exports = UsuarioManifiesto2;