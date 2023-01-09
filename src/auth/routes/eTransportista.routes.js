const { Router } = require('express');
const validateToken = require('../../../middlewares/validateToken');
const etransportistaCtrl = require("../controllers/eTrasnportista.controller");

const router = Router();


router.get('/', validateToken, etransportistaCtrl.mostrar);
router.get('/listado-transportistas', validateToken, etransportistaCtrl.mostrarPorIdEmpresaTransportista);
router.get('/campo/:parameter/:value', validateToken, etransportistaCtrl.mostrarPorCampos);
router.post('/', etransportistaCtrl.registrar);
router.put('/', validateToken, etransportistaCtrl.actualizar);

module.exports = router;