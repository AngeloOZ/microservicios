const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Transportista = sequelize.define('Transportista', {
    id_transportista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario:{
        type: DataTypes.INTEGER
    },
    cargo:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    tipo_auto:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    placa:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
}, {
    timestamps: false,
    tableName: "Transportista"
});

module.exports = Transportista;