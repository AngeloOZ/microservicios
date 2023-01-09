const { Router } = require('express');
const eProductorCtr = require('../controllers/eProductora.controller');
const { registrarProductorValid } = require('../validators/eProductor.validators');
const validateToken = require('../../../middlewares/validateToken');
const router = Router();



router.get('/', validateToken, eProductorCtr.mostrar);
router.get('/campo/:parameter/:value', validateToken, eProductorCtr.mostrarPorCampos);
router.post('/', eProductorCtr.registrar);
router.put('/', validateToken, eProductorCtr.actualizar);

module.exports = router;