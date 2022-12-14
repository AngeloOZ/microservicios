const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_JWT || "1234";

/**
 * 
 * @param {Object} payload informacion del usuario 
 * @param {Number|String|undefined} expireTime Tiempo que durará el token
 * @returns {String} 
 */
const singToken =
    (payload, expireTime = undefined) => {
        try {
            // console.log(payload);
            if (!SECRET_KEY) {
                throw "No hay semilla para firmar el token";
            }
            if (expireTime) {
                return jwt.sign(payload, SECRET_KEY, { expiresIn: expireTime });
            }
            return jwt.sign(payload, SECRET_KEY);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

/**
 * 
 * @param {String} token Es el token a verificar
 * @returns {IUser}
 */
const verifyToken = (token) => {
    try {
        if (!SECRET_KEY) {
            throw "No hay semilla para firmar el token";
        }
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { singToken, verifyToken }