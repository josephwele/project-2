const mysql = require('mysql');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('futurosenso-log');
const user = require('futurosenso-user-mysql');
const config = require('./config/confige.js');
const match = require('./matcher');
/// / EXPRESS INIT ////

var app = express();
app.use(cors());
app.use(bodyParser.text({ limit: '1kb' }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 300;
const ENV = process.env.NODE_ENV || 'development';
/// / DATABASE INIT ////
if (!user.connectToDatabase(config.sqlParams, config.userTableName)) {
    logger.log('Error connecting to database');
    process.exit(1);
}

user.tableExisting(config.userTableName, (error, existing) => {
    if (!error && !existing) {
        user.init(config.sqlParams, config.userTableName, (error, initDone) => {
            if (error || !initDone) {
                logger.log('Error occured during database initialization');
                process.exit(1);
            }
        });
    }
});

// USER LOGIN
app.post('/user/login', function(req, res) {
    let info = req.body;
    console.log(info);
    if (user.isEmailValid(info.email)) {
        if (user.isPasswordValid(info.password)) {
            user.login(info.email, info.password, (error, isLoginCorrect, isPassCorrect, authToken) => {
                if (error) {
                    res.json({ success: false, error: 'system error' });
                } else if (!isLoginCorrect) {
                    res.json({ success: false, error: 'login not existing' });
                } else if (!isPassCorrect) {
                    res.json({ success: false, error: 'password not correct' });
                } else if (authToken) {
                    console.log('loged in correctly');
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
    console.log('someone access create');
    let info = req.body;
    console.log(info);
    if (user.isEmailValid(info.email)) {
        console.log('email is valid 1');
        user.isEmailAlreadyTaken(info.email, (error, existing) => {
            if (error) {
                res.json({ success: false, error: 'system error' });
            } else if (existing) {
                res.json({ success: false, error: 'email not available' });
            } else {
                if (user.isPasswordValid(info.password)) {
                    console.log('password passed');
                    user.createUser(info.email, info.password, info.userData ? info.userData : {},
                        (error, loginData, userData, confirmToken) => {
                            if (!error && confirmToken) {
                                console.log('good Job boy');
                                res.json({ success: true, confirmToken: confirmToken });
                            } else {
                                res.json({ success: false, error: 'user not created' });
                            }
                        });
                } else {
                    res.json({ success: false, error: 'password not valid' });
                }
            }
        });
    } else {
        res.json({ success: false, error: 'email not valid' });
    }
});
// User log out
app.post('/user/logout', function(req, res) {
    if (req.body.authToken) {
        user.logout(req.body.authToken, (error, isAuthTokenValid, isLoggedOut) => {
            if (!isAuthTokenValid) {
                res.json({ success: false, error: 'authentication token not valid' });
            }
            if (error) {
                res.json({ success: false, error: 'system error' });
            } else if (isLoggedOut) {
                console.log('logout succesfull');
                res.json({ success: true });
            } else {
                res.json({ success: false, error: 'logout not done' });
            }
        });
    } else {
        res.json({ success: false, error: 'access token not valid' });
    }
});

//= ========================================================================================//
// var pool = connection.connect();
app.get('/', function(req, res) {
    match.matcher()

});

// START SERVER LISTENING - PLESK SYSTEM STYLE ////

app.listen(PORT, function() {
    console.log(
        '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT);
});
//= =================================================================================//