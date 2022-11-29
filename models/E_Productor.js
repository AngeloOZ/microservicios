const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const E_Productor = sequelize.define('E_Productor', {
    id_eproductor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
    },
    num_registro:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    num_manifiesto:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    ruc:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    nombre_instalacion:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    timestamps: false,
    tableName: "E_Productor"
});

module.exports = E_Productor;