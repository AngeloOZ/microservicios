const Tipo = require("./Tipo");


(async () => {
    const listadoRoles = await Tipo.findAll();
    if(listadoRoles.length == 0){
        await Tipo.create({ descripcion: "Empresa transportista" })
        await Tipo.create({ descripcion: "Empresa productora" })
        await Tipo.create({ descripcion: "Empresa almacenamiento" })
        await Tipo.create({ descripcion: "transportista" })
    }
})()