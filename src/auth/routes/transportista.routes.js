const { Router } = require('express');
const transportistaCtrl = require("../controllers/transportista.controller");
const validateToken = require('../../../middlewares/validateToken');

const router = Router();


router.get('/', validateToken, transportistaCtrl.mostrar);
router.get('/campo/:parameter/:value', validateToken, transportistaCtrl.mostrarPorCampos);
router.post('/', validateToken, transportistaCtrl.registrar);
router.put('/', validateToken, transportistaCtrl.actualizar);

module.exports = router;