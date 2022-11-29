const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const AEE = sequelize.define('AEE', {
    id_instalacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    capacidad_contenedor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tipo_contenedor: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unidades: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: "aee"
});


module.exports = AEE;