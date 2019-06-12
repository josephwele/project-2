const express = require('express');
const mysql = require('mysql');
const user = require('futurosenso-user-mysql');
const config = require('./config/confige.js');

if (!user.connectToDatabase(config.sqlParams, config.userTableName)) {
    logger.log('Error connecting to database');
    process.exit(1);
}
exports.matcher = function(stt, dest) {
        user.pool.query(`SELECT  * FROM table.user`,
            function(error, result) {
                if (error) throw error;
                if (result.length != 0) {
                    res.send(result);
                } else {
                    pool.query(`SELECT firstName,lastName,phoneNumber FROM ${table.userTable} where starting= ${stt}`),
                        function(err, result) {
                            if (err) err;
                            if (result.length != 0) {
                                res.send(result);
                            }
                        };
                }
            }
        );