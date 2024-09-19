// const express = require('express');
// const nodemailer = require('nodemailer');
// require('dotenv').config();
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(cors());
// app.use(bodyParser.json());

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false, 
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// app.post('/send-email', (req, res) => {
//   const { name, lname, email, number, message } = req.body;

//   const mailOptions = {
//     from: 'shstore62@gmail.com',
//     to: 'obliqware@gmail.com',
//     subject: 'New Demo Product Form Submission - Obliqware',
//     html: `
//       <h1>Obliqware Demo Products</h1>
//       Name: ${name}
//       Last Name: ${lname}
//       Email: ${email}
//       Number: ${number}
//       Message: ${message}
//       Products: ${products.join(', ')}
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       return res.status(500).send('Error sending email');
//   } else {
//       console.log('Email sent: ' + info.response);
//       res.status(200).send('Email sent successfully');
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:3000/get-demo', 'https://obliqware.web.app/get-demo'], // Allow requests from localhost and your frontend domain
  methods: 'GET,POST',
  allowedHeaders: ['Content-Type'],
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

// Endpoint to handle demo request
app.post('/api/demo-request', (req, res) => {
    const { first_name, last_name, email, phone_number, message, products } = req.body;

    // Create the email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to your email address
        subject: 'New Demo Request',
        html: `
            You have received a new demo request!
            First Name: ${first_name}
            Last Name: ${last_name}
            Email: ${email}
            Phone: ${phone_number}
            Message: ${message}
            Products Interested: ${products}
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ message: 'Internal Server Error', error });
        }
        console.log('Email sent:', info.response);
        res.status(200).send({ message: 'Email sent successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
