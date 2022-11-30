const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Manifiesto_Transportista = sequelize.define('Manifiesto_Transportista', {
    id_manifiesto_transportista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    punto_salida:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    punto_llegada:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    autorizacion:{
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    fecha_embarque:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    ruta_transporte:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    carreteras:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "Manifiesto_Transportista"
});

module.exports = Manifiesto_Transportista;