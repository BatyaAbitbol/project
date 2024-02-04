const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    secure: true,
    auth: {
        user: 't0533155745@gmail.com',
        pass: 'gkndhuqqonyjqzaf'
    }
});

exports.sendEmail = (to, subject, body) => {
    const mailOptions = {
        from: 'School 📚',
        to: to,
        subject: subject,
        text: body
    };
    return transporter.sendMail(mailOptions);
};