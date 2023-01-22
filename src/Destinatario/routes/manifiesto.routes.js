const { Router } = require('express');
const manifiestoCtr = require('../controllers/manifiesto.controller');
const validateToken = require('../../../middlewares/validateToken');

const router = Router();

router.post('/', validateToken, manifiestoCtr.registrar);


module.exports = router;