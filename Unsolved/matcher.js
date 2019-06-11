const express = require('express'),
    path = require('path'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    config = require('./config/confige');
//Express init//
var app = express();
app.use(bodyParser.text({ limit: '1kb' }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 300;
export.matcher = function()