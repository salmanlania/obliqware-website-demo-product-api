const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'shstore62@gmail.com',
    pass: 'jagnumhutdgjhelb' // Replace with the App Password you generated
  }
});

app.post('/send-email', (req, res) => {
  const { name, lname , email, number, message } = req.body;

  const mailOptions = {
    from: 'shstore62@gmail.com',
    to: 'salmanlania@gmail.com',
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Last Name : ${lname}
      Email: ${email}
      Number: ${number}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});