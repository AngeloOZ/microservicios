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
    nombre_destinatario_alterno: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    telefono_destinatario_alterno: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    fecha_destinatario_alterno: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    manejo: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_destinatario: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    cargo_destinatario: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    fecha_destinatario: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "Manifiesto_Destinatario"
});

module.exports = Manifiesto_Destinatario;