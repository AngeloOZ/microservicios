const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const E_Productor = sequelize.define('E_Productora', {
    id_eproductor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ruc:{
        type: DataTypes.STRING(13),
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "E_Productora"
});

module.exports = E_Productor;