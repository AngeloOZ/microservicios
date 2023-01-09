const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const E_Destinataria = sequelize.define('E_Destinataria', {
    id_edestinataria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_empresa:{
        type: DataTypes.STRING(15),
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: "E_Destinataria"
});

module.exports = E_Destinataria;