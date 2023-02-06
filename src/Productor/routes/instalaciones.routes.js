const { Router } = require('express');
const instalacionCtr = require('../controllers/instalaciones.controller');
const validateToken = require('../../../middlewares/validateToken');

const router = Router();


router.get('/', validateToken, instalacionCtr.mostrar);
router.get('/campo/:parameter/:value', validateToken, instalacionCtr.mostrarPorCampos);
router.post('/', validateToken, instalacionCtr.registrar);
router.put('/', validateToken, instalacionCtr.actualizar2);
router.delete('/:id', validateToken, instalacionCtr.eliminar);

module.exports = router;