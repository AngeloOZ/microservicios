const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Pago = sequelize.define('Pago', {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // id_usuario:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    descripcion:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    meses: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "Pago"
});

module.exports = Pago;