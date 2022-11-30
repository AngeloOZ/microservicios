const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Manifiesto = sequelize.define('Manifiesto', {
    id_manifiesto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_manifiesto_transportista:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_manifiesto_producto:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_manifiesto_destinatario:{
        type: DataTypes.INTEGER,
        allowNull: false
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