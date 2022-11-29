const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const E_Trasportista = sequelize.define('E_Trasportista', {
    id_etrasportista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    plan_contingencia:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lincencia_policia:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    timestamps: false,
    tableName: "E_Trasportista"
});

module.exports = E_Trasportista;