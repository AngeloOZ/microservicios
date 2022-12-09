const { Router } = require('express');
const { registrarEProductora, obtenerEProductoras, obtenerEProductorPorAtributo } = require('../controllers/eProductora.controller');
const { registrarProductorValid } = require('../validators/eProductor.validators');
const router = Router();



router.get('/', obtenerEProductoras);
router.get('/:parameter/:value', obtenerEProductorPorAtributo);
router.post('/', registrarProductorValid, registrarEProductora);

module.exports = router;