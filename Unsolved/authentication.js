const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('futurosenso-log');
const user = require('futurosenso-user-mysql');
const config = require('./config/userAuthentication');

/// / EXPRESS INIT ////

var app = express();
app.use(cors());
app.use(bodyParser.text({ limit: '1kb' }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// USER LOGIN
app.post('/user/login', function(req, res) {
    console.log('someone access me');
    let info = req.body;
    if (user.isEmailValid(info.email)) {
        if (user.isPasswordValid(info.pass)) {
            user.login(info.email, info.pass, (error, isLoginCorrect, isPassCorrect, authToken) => {
                if (error) {
                    res.json({ success: false, error: 'system error' });
                } else if (!isLoginCorrect) {
                    res.json({ success: false, error: 'login not existing' });
                } else if (!isPassCorrect) {
                    res.json({ success: false, error: 'password not correct' });
                } else if (authToken) {
                    res.json({ success: true, authToken: authToken });
                }
            });
        } else {
            res.json({ success: false, error: 'password not valid' });
        }
    } else {
        res.json({ success: false, error: 'email not valid' });
    }
});
// USER CREATION
app.post('/user/create', function(req, res) {
    console.log('someone access me');
    let info = req.body;
    if (user.isEmailValid(info.email)) {
        user.isEmailAlreadyTaken(info.email, (error, existing) => {
            if (error) {
                res.json({ success: false, error: 'system error' });
            } else if (existing) {
                res.json({ success: false, error: 'email not available' });
            } else {
                if (user.isPasswordValid(info.pass)) {
                    user.createUser(info.email, info.pass, info.userData ? info.userData : {},
                        (error, loginData, userData, confirmToken) => {
                            if (!error && confirmToken) {
                                res.json({ success: true, confirmToken: confirmToken });
                            } else {
                                res.json({ success: false, error: 'user not created' });
                            }
                        })
                } else {
                    res.json({ success: false, error: 'password not valid' });
                }
            }
        })
    } else {
        res.json({ success: false, error: 'email not valid' });
    }
})
app.listen(PORT, function() {
    console.log(
        '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT);
})