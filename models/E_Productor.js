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
    ruc:{
        type: DataTypes.STRING(13),
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