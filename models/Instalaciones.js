const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Instalaciones = sequelize.define('Instalaciones', {
    id_instalacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
    },
    nombre_instalacion:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    domicilio:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    provincia:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    canton:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    parroquia:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    n_onu:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    estado:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: false,
    tableName: "Instalaciones"
});

module.exports = Instalaciones;