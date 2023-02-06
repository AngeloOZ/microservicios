const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Manifiesto = sequelize.define('Manifiesto', {
    id_manifiesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fase:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false,
    tableName: "Manifiesto"
});

module.exports = Manifiesto;