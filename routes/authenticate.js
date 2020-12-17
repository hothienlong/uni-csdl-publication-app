const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const mysql      = require('mysql');
const saltRounds = 10;

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'authentication',
    password : 'authentication_password',
    database : 'publication'
});
connection.connect();

router.post('/signup', (req, res)=>{
    const password = req.body.password;
    const username = req.body.username;
    const fname = req.body.fname;
    const address = req.body.address;
    const email = req.body.email;
    const company = req.body.company;
    const job = req.body.job;
    const degree = req.body.degree;
    const profession = req.body.profession;
    const work_email = req.body.work_email;
    const is_author = req.body.is_author;
    const is_contact_author = req.body.is_contact_author;
    const is_reviewer = req.body.is_reviewer;
    const is_editor = req.body.is_editor;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err) return res.sendStatus(500);
        var query = 'call create_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
        connection.query(
            query,
            [
                username, 
                fname, 
                address, 
                email, 
                company, 
                job, 
                degree, 
                profession,
                hash,
                work_email,
                is_author,
                is_contact_author,
                is_reviewer,
                is_editor
            ], 
            (err, results, fields)=>{
                console.log(err);
                if(err) return res.sendStatus(500);
                const token = jwt.sign({username:username}, 'JWR-TOKEN-SECRET-SHOULD-BE-STORED-IN-PROCESS-ENV');
                res.status(200).json(token);
            });
    });
});

router.post('/signin', (req, res)=>{
    const password = req.body.password;
    const username = req.body.username;

    var query = 'call get_hashed_password(?);';
    connection.query(
        query,
        [username], 
        (err, results, fields)=>{
            if(err) return res.sendStatus(500);
            if(results.length == 0) return res.sendStatus(403);
            bcrypt.compare(password, results[0][0].hashed_pass, function(err, result) {
                if(err) return res.sendStatus(500);
                if(!result) return res.sendStatus(403);
                const token = jwt.sign({username:username}, 'JWR-TOKEN-SECRET-SHOULD-BE-STORED-IN-PROCESS-ENV');
                res.status(200).json(token);
            });
        });
});

module.exports = router;