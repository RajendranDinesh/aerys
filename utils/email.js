import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    secure: false
});

const sendMail = (to, subject, text, html) => {
    const mailOptions = {
        "from": process.env.EMAIL,
        "to" : to,
        "subject" : subject,
        "text" : text,
        "html" : html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);

            return true;
        }
    });
};

module.exports = { sendMail };