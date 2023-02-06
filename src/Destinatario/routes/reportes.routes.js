const { Router } = require('express');
const reportesCtr = require('../controllers/reportes.controller');
const validateToken = require('../../../middlewares/validateToken');

const router = Router();

router.get('/manifiestos-generados', validateToken, reportesCtr.reporte_manifiestos);


module.exports = router;