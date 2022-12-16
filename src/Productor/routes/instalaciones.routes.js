const { Router } = require('express');
const instalacionCtr = require('../controllers/instalaciones.controller');

const router = Router();


router.get('/', instalacionCtr.mostrar);
router.get('/:parameter/:value', instalacionCtr.mostrarPorCampos);
router.post('/', instalacionCtr.registrar);
router.put('/', instalacionCtr.actualizar2);

module.exports = router;