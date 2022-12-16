const { Router } = require('express');
const eProductorCtr = require('../controllers/eProductora.controller');
const { registrarProductorValid } = require('../validators/eProductor.validators');
const router = Router();



router.get('/', eProductorCtr.mostrar);
router.get('/:parameter/:value', eProductorCtr.mostrarPorCampos);
router.post('/', registrarProductorValid, eProductorCtr.registrar);
router.put('/', registrarProductorValid, eProductorCtr.actualizar);

module.exports = router;