const { Router } = require('express');
const { login, actualizarUsuarioBase } = require('../controllers/auth.controller');

const router = Router();


router.post('/login', login);
router.put('/actualizar-usuario-base', actualizarUsuarioBase);

module.exports = router;