const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sử dụng bodyParser để đọc dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: true }));

// Tạo một trang gửi email đơn giản
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Xử lý khi người dùng gửi form
app.post('/send-email', (req, res) => {
    const { to, subject, message } = req.body;

    console.log(message)

    // Cấu hình transporter để gửi email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rongvang2357hn@gmail.com',
            pass: 'knxvowfxrcrwlizw'
        }
    });

    const emailTemplate = require('fs').readFileSync(__dirname + '/email-template.html', 'utf-8');

    const emailContent = emailTemplate.replace('{{to}}', to).replace('{{subject}}', subject).replace('{{message}}', message);

    const mailOptions = {
        from: 'rongvang2357hn@gmail.com',
        to,
        subject,
        html: emailContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
