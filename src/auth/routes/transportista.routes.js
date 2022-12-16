const { Router } = require('express');
const transportistaCtrl = require("../controllers/transportista.controller");

const router = Router();


router.get('/', transportistaCtrl.mostrar);
router.get('/:parameter/:value', transportistaCtrl.mostrarPorCampos);
router.post('/', transportistaCtrl.registrar);
router.put('/', transportistaCtrl.actualizar);

module.exports = router;