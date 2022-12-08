const Tipo = require("./Tipo");


(async () => {

    await Tipo.create({descripcion: "rol 1"})
    await Tipo.create({descripcion: "rol 2"})

})()