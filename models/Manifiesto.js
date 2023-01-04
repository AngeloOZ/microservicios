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
    }
}, {
    timestamps: false,
    tableName: "Manifiesto"
});

module.exports = Manifiesto;