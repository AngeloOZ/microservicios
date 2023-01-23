
const nodemailer = require("nodemailer");
const config = require("../config");
const fs = require('fs');

// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.email.user, // generated ethereal user
        pass: config.email.pass, // generated ethereal password
    },
});

/**
 * Funcion para enviar correos de notificacion de manifiesto
 * @param {Object} configEnvio Datos de la configuracion de envio y manifiesto
 * @param {string} configEnvio.nombre
 * @param {string} configEnvio.correo
 * @param {string|number} configEnvio.numero_manifiesto
 * @returns Promise<boolean>
 */
const enviarCorreo = async (configEnvio) => {
    try {
        let htmlstream = fs.readFileSync('helpers/plantilla.html', 'utf-8');
        htmlstream = htmlstream.replace('@EMPRESA', configEnvio.nombre);
        htmlstream = htmlstream.replace('@NUMERO', configEnvio.numero_manifiesto);


        let info = await transporter.sendMail({
            from: config.email.user,
            to: configEnvio.correo,
            subject: `Asignación ✔ de manifiesto #${configEnvio.numero_manifiesto}`,
            html: htmlstream,
        });

        console.log("Message sent: %s", info.messageId);
        return true;

    } catch (error) {
        console.error("Error correo");
        console.log(error);
        return false;
    }
}

module.exports = { transporter, enviarCorreo };