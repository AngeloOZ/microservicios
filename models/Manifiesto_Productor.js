const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Manifiesto_Productor = sequelize.define('Manifiesto_Productor', {
    id_manifiesto_productor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    n_registro: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    n_manifiesto: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    pagina: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    instrucciones_especiales: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    nombre_productor: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    cargo_productor: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    correo_productor: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefono_productor: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    numero_resolutivo: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "Manifiesto_Productor"
});

module.exports = Manifiesto_Productor;