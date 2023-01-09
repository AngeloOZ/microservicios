const { Router } = require('express');
const manifiestoCrt = require('../controllers/manifiestop1.controller');
const validateToken = require('../../../middlewares/validateToken');

const router = Router();


router.post('/',validateToken, manifiestoCrt.registrar);
// router.get('/', aeeCtr.mostrar);
// router.get('/empresa-productor', aeeCtr.mostrarAEEProductor);
// router.get('/instalacion/:id', aeeCtr.mostrarAEEInstalacion);
// router.get('/:parameter/:value', aeeCtr.mostrarPorCampos);
// router.post('/', aeeCtr.registrar);
// router.put('/', aeeCtr.actualizar2);

module.exports = router;