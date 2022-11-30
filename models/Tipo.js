const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Tipo = sequelize.define('Tipo', {
    id_Tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: "Tipo"
});

module.exports = Tipo;