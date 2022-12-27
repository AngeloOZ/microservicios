const { Router } = require('express');
const eDestinatarioCtrl = require("../controllers/eDestinatario.controller");
const validateToken = require('../../../middlewares/validateToken');

const router = Router();


router.get('/', validateToken, eDestinatarioCtrl.mostrar);
router.get('/:parameter/:value', validateToken, eDestinatarioCtrl.mostrarPorCampos);
router.post('/', eDestinatarioCtrl.registrar);
router.put('/', validateToken, eDestinatarioCtrl.actualizar);

module.exports = router;