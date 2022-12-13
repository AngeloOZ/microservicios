const { Router } = require('express');
const eDestinatarioCtrl = require("../controllers/eDestinatario.controller");

const router = Router();


router.get('/', eDestinatarioCtrl.mostrar);
router.get('/:parameter/:value', eDestinatarioCtrl.mostrarPorCampos);
router.post('/', eDestinatarioCtrl.registrar);
// router.put('/', eDestinatarioCtrl.actualizar);

module.exports = router;