const AEE = require("./AEE");
const E_Destinataria = require("./E_Destinataria");
const E_Productor = require("./E_Productor");
const E_Trasportista = require("./E_Trasportista");
const Instalaciones = require("./Instalaciones");
const Manifiesto = require("./Manifiesto");
const Manifiesto_Destinatario = require("./Manifiesto_Destinatario");
const Manifiesto_Productor = require("./Manifiesto_Productor");
const Manifiesto_Transportista = require("./Manifiesto_Transportista");
const Pago = require("./Pago");
const Tipo = require("./Tipo");
const Transportista = require("./Transportista");
const Usuario = require("./Usuario");


/* Relacion uno a uno Usuario = E_productor */
Usuario.hasOne(E_Productor);
E_Productor.belongsTo(Usuario);

/* Relacion uno a uno Usuario => E_transportista */
Usuario.hasOne(E_Trasportista);
E_Trasportista.belongsTo(Usuario);

/* Relacion uno a uno Usuario => Transportista */
Usuario.hasOne(Transportista);
Transportista.belongsTo(Usuario);

/* Relacion uno a uno Usuario => E_Destinataria */
Usuario.hasOne(E_Destinataria);
E_Destinataria.belongsTo(Usuario);

/* Relacion uno a muchos E_Productor => Instalacion */
E_Productor.hasMany(Instalaciones);
Instalaciones.belongsTo(E_Productor);

/* Relacion uno a muchos Instalaciones => AEE (Aparato Electrico y Electronico) */
Instalaciones.hasMany(AEE);
AEE.belongsTo(Instalaciones);

/* Relacion muchos a muchos Usuarios => Manifiesto */
Usuario.belongsToMany(Manifiesto)
Manifiesto.belongsToMany(Usuario);

/* Relacion uno a uno Manifiesto => Manifiesto_Productor */
Manifiesto.hasOne(Manifiesto_Productor)
Manifiesto_Productor.belongsTo(Manifiesto);

/* Relacion uno a uno Manifiesto => Manifiesto_Transportista */
Manifiesto.hasOne(Manifiesto_Transportista)
Manifiesto_Transportista.belongsTo(Manifiesto);

/* Relacion uno a uno Manifiesto => Manifiesto_Destinatario */
Manifiesto.hasOne(Manifiesto_Destinatario)
Manifiesto_Destinatario.belongsTo(Manifiesto);

/* Relacion uno a muchos Usuario => Pago */
Usuario.hasMany(Pago)
Pago.belongsTo(Usuario);

/* Relacion uno a muchos Tipo => Usuarios */
Tipo.hasMany(Usuario)
Usuario.belongsTo(Tipo);
