const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    contrasenia: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    identificacion: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    foto_url: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    domicilio: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    licencia_ambiental: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
}, {
    timestamps: false,
    tableName: "Usuario"
});

module.exports = Usuario;