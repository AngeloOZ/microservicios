const { Router } = require('express');
const router = Router();


const { getCarriersUsers } = require('../controllers/usuarioTransportita.Controller');

router.get('/', getCarriersUsers);

module.exports = router;