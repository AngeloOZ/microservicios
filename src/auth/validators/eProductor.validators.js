const { check } = require("express-validator");
const { validateResult } = require("../../../helpers/validateHelper");

const registrarProductorValid = [
    check('usuario')
        .exists()
        .withMessage("usuario is required")
        .bail()
        .notEmpty()
        .withMessage("usuario must not be empty")
        .bail()
        .isAlphanumeric()
        .withMessage("usuario must be character alphanumeric")
        .trim(),
    check('contrasenia')
        .exists()
        .withMessage("contrasenia is required")
        .bail()
        .notEmpty()
        .withMessage("contrasenia must not be empty")
        .trim(),
    check('correo')
        .exists()
        .withMessage("correo is required")
        .bail()
        .notEmpty()
        .withMessage("correo must not be empty")
        .isEmail()
        .withMessage("invalid correo")
        .bail()
        .trim(),
    check('nombre')
        .exists()
        .withMessage("nombre is required")
        .bail()
        .notEmpty()
        .withMessage("nombre must not be empty")
        .trim(),
    check('identificacion')
        .exists()
        .withMessage("identificacion is required")
        .bail()
        .notEmpty()
        .withMessage("identificacion must not be empty")
        .trim(),
    (req, res, next) => validateResult(req, res, next)
];



module.exports = { registrarProductorValid }