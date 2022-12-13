const { Router } = require('express');
const etransportistaCtrl = require("../controllers/eTrasnportista.controller");

const router = Router();


router.get('/', etransportistaCtrl.mostrar);
router.get('/:parameter/:value', etransportistaCtrl.mostrarPorCampos);
router.post('/', etransportistaCtrl.registrar);
// router.put('/', etransportistaCtrl.actualizar);

module.exports = router;