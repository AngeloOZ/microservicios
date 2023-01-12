const { Router } = require('express');
const aeeCtr = require('../controllers/aee.controller');
const validateToken = require('../../../middlewares/validateToken');

const router = Router();


router.get('/', validateToken, aeeCtr.mostrar);
router.get('/instalacion/:id', validateToken, aeeCtr.mostrarAEEInstalacion);
router.get('/campo/:parameter/:value', validateToken, aeeCtr.mostrarPorCampos);
router.post('/', aeeCtr.registrar);
router.put('/', aeeCtr.actualizar2);
router.delete('/:id', aeeCtr.eliminar);

module.exports = router;