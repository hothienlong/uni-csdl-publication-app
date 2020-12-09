const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'author',
    password : 'author_password',
    database : 'publication'
});
connection.connect();



module.exports = router;