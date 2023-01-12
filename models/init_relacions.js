const AEE = require("./AEE");
const E_Destinataria = require("./E_Destinataria");
const E_Productor = require("./E_Productor");
const E_Trasportista = require("./E_Trasportista");
const Instalaciones = require("./Instalaciones");
const Manifiesto = require("./Manifiesto");
const Manifiesto_Destinatario = require("./Manifiesto_Destinatario");
const Manifiesto_Productor = require("./Manifiesto_Productor");
const Manifiesto_Transportista = require("./Manifiesto_Transportista");
// const Pago = require("./Pago");
const Tipo = require("./Tipo");
const Transportista = require("./Transportista");
const Usuario = require("./Usuario");
const UsuarioManifiesto = require("./UsuarioManifiesto");

/* Relacion uno a uno Usuario = E_productor */
Usuario.hasOne(E_Productor, {
    foreignKey: "id_usuario",
    sourceKey: "id_usuario"
});
E_Productor.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id_usuario"
});

/* Relacion uno a uno Usuario => E_transportista */
Usuario.hasOne(E_Trasportista, {
    foreignKey: "id_usuario",
    sourceKey: "id_usuario"
});
E_Trasportista.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id_usuario"
});

/* Relacion uno a uno Usuario => Transportista */
Usuario.hasOne(Transportista, {
    foreignKey: "id_usuario",
    sourceKey: "id_usuario"
});
Transportista.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id_usuario"
});

E_Trasportista.hasMany(Transportista, {
    foreignKey: "id_etrasportista",
    sourceKey: "id_etrasportista",
});
Transportista.belongsTo(E_Trasportista, {
    foreignKey: "id_etrasportista",
    targetKey: "id_etrasportista",
});


/* Relacion uno a uno Usuario => E_Destinataria */
Usuario.hasOne(E_Destinataria, {
    foreignKey: "id_usuario",
    sourceKey: "id_usuario"
});
E_Destinataria.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id_usuario"
});

/* Relacion uno a muchos E_Productor => Instalacion */
E_Productor.hasMany(Instalaciones, {
    foreignKey: {
        name: "id_eproductor",
        allowNull: false
    },
    sourceKey: "id_eproductor",
});
Instalaciones.belongsTo(E_Productor, {
    foreignKey: {
        name: "id_eproductor",
        allowNull: false
    },
    targetKey: "id_eproductor",
});

/* Relacion uno a muchos Instalaciones => AEE (Aparato Electrico y Electronico) */
Instalaciones.hasMany(AEE, {
    foreignKey: "id_instalacion",
    sourceKey: "id_instalacion"
});
AEE.belongsTo(Instalaciones, {
    foreignKey: "id_instalacion",
    targetKey: "id_instalacion"
});

/* Relacion muchos a muchos Usuarios => Manifiesto */
Usuario.belongsToMany(Manifiesto, {
    through: "UsuarioManifiesto"
});
Manifiesto.belongsToMany(Usuario, {
    through: "UsuarioManifiesto"
});

/* Relacion uno a uno Manifiesto => Manifiesto_Productor */
Manifiesto_Productor.hasOne(Manifiesto, {
    foreignKey: "id_manifiesto_productor",
    sourceKey: "id_manifiesto_productor"
})
Manifiesto.belongsTo(Manifiesto_Productor, {
    foreignKey: "id_manifiesto_productor",
    targetKey: "id_manifiesto_productor"
});

Instalaciones.hasOne(Manifiesto_Productor, {
    foreignKey: "id_instalacion",
    sourceKey: "id_instalacion"
})
Manifiesto_Productor.belongsTo(Instalaciones, {
    foreignKey: "id_instalacion",
    targetKey: "id_instalacion"
});

/* Relacion uno a uno Manifiesto => Manifiesto_Transportista */
Manifiesto_Transportista.hasOne(Manifiesto, {
    foreignKey: "id_manifiesto_transportista",
    sourceKey: "id_manifiesto_transportista"
})
Manifiesto.belongsTo(Manifiesto_Transportista, {
    foreignKey: "id_manifiesto_transportista",
    targetKey: "id_manifiesto_transportista"
});

/* Relacion uno a uno Manifiesto => Manifiesto_Destinatario */
Manifiesto_Destinatario.hasOne(Manifiesto, {
    foreignKey: "id_manifiesto_destinatario",
    sourceKey: "id_manifiesto_destinatario"
})
Manifiesto.belongsTo(Manifiesto_Destinatario, {
    foreignKey: "id_manifiesto_destinatario",
    sourceKey: "id_manifiesto_destinatario"
});

/* Relacion uno a muchos Usuario => Pago 
Usuario.hasMany(Pago, {
    foreignKey: "id_usuario",
    sourceKey: "id_usuario"
})
Pago.belongsTo(Usuario, {
    foreignKey: "id_usuario",
    targetKey: "id_usuario"
});
*/

/* Relacion uno a muchos Tipo => Usuarios */
Tipo.hasMany(Usuario, {
    foreignKey: "id_tipo",
    sourceKey: "id_tipo"
})
Usuario.belongsTo(Tipo, {
    foreignKey: "id_tipo",
    targetKey: "id_tipo"
});
