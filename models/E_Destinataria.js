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
        allowNull: false,
    },
    // estado: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     defaultValue: 0,
    // }
}, {
    timestamps: false,
    tableName: "E_Destinataria"
});

module.exports = E_Destinataria;