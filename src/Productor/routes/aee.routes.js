const { Router } = require('express');
const aeeCtr = require('../controllers/aee.controller');

const router = Router();


router.get('/', aeeCtr.mostrar);
router.get('/:parameter/:value', aeeCtr.mostrarPorCampos);
router.post('/', aeeCtr.registrar);
router.put('/', aeeCtr.actualizar2);

module.exports = router;