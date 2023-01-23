
const nodemailer = require("nodemailer");
const config = require("../config");

// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
const transporter  = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.email.user, // generated ethereal user
        pass: config.email.pass, // generated ethereal password
    },
});


(async () => {
    const test = await nodemailer.createTestAccount();
    console.log(test);
})

module.exports = transporter ;