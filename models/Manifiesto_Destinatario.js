const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Manifiesto_Destinatario = sequelize.define('Manifiesto_Destinatario', {
    id_manifiesto_destinatario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    diferencias_entregas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_destinatario_alterno: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    manejo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_encargado: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    cargo_encargado: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    fecha_encargado: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "Manifiesto_Destinatario"
});

module.exports = Manifiesto_Destinatario;