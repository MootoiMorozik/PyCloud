// NODE JS
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(session({
    secret: 'your-secret-key', //Change
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using HTTPS
}));

function checkCaptcha(req, res, next) {
    if (req.session.captchaVerified) {
        return next();
    }
    
    res.sendFile(path.join(__dirname, 'pycloud.html'));
}

app.use(express.static('public'));

// Main route
app.get('/', checkCaptcha, (req, res) => {
    res.send('Welcome! You have successfully passed the CAPTCHA.');
});

// API endpoint to verify CAPTCHA
app.post('/verify_captcha', express.json(), (req, res) => {
    req.session.captchaVerified = true;
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});