const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs_application',
    password : 'nodejs_application_password',
    database : 'publication'
});
connection.connect();


// router.use('/author', require('./author'));
router.use('/reviewer', (req,res,next) => {
    req.user = jwt.decode(req.headers.authorization).username
    next()
} , require('./reviewer') );
router.use('/editor', (req, res, next) => {
    req.user = jwt.decode(req.headers.authorization).username;
    next();
} ,require('./editor'));


module.exports = router;