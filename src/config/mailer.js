import nodeMailer from "nodemailer";

let adminEmail = process.env.MAIL_USER;
let adminPassword = process.env.MAIL_PASSWORD;
let mailhost = process.env.MAIL_HOST;
let mailport = process.env.MAIL_PORT;

let sendEmail = (to, subject, htmlContent) => { 
    let transporter = nodeMailer.createTransport({
        host: mailhost,
        port: mailport,
        secure: false, //use SSL-TLS
        auth: { 
            user: adminEmail,
            pass: adminPassword
        }
    });

    let options = {
        from: adminEmail,
        to: to, 
        subject: subject,
        html: htmlContent
    };

    return transporter.sendMail(options); // return defaul promise 
};


module.exports = sendEmail;