const { Router } = require('express');
const instalacionCtr = require('../controllers/instalaciones.controller');
const validateToken = require('../../../middlewares/validateToken');

const router = Router();


router.get('/', validateToken, instalacionCtr.mostrar);
router.get('/:parameter/:value', validateToken, instalacionCtr.mostrarPorCampos);
router.post('/', validateToken, instalacionCtr.registrar);
router.put('/', validateToken, instalacionCtr.actualizar2);

module.exports = router;