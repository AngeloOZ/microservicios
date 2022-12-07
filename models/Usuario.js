const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // id_tipo: {
    //     type: DataTypes.INTEGER,
    // },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    contrasenia: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    foto_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    domicilio: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    licencia_ambiental: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    timestamps: false,
    tableName: "Usuario"
});

module.exports = Usuario;