const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, //'ppranavas01@gmail.com',
        pass: process.env.GMAIL_PASS, //'laco ymcx fjmy fiwa',
    },
});

// Route to send email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: ['ppranavas01@gmail.com', 'preetamjdsouza@gmail.com', 'syleshkyle@gmail.com'],
        subject: `Bragi contact form submission from ${name}`,
        text: `You have received a new message from ${name} (${email}): \n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send email' });
        }
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





/*
Generated app password

Your app password for your device
laco ymcx fjmy fiwa

How to use it
Go to the settings for your Google Account in the application or device you are trying to set up. Replace your password with the 16-character password shown above.

Just like your normal password, this app password grants complete access to your Google Account. You won't need to remember it, so don't write it down or share it with anyone.
*/