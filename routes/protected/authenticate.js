const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const mysql      = require('mysql');
const { reject } = require('bluebird');
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
    const position = req.body.position;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err)
            return res.sendStatus(500);
        var query = 'INSERT INTO SCIENTIST '+
        '(ID, HASHED_PASS, FNAME, ADDRESS, EMAIL, COMPANY, JOB, DEGREE, PROFESSION)'+ 
        'VALUES(?,?,?,?,?,?,?,?,?);';
        connection.query(
            query,
            [username, hash, fname, address, email, company, job, degree, profession], 
            (err, results, fields)=>{
                if(err) return res.json({result: 'fail'});
                
                if (position.includes('editor')) {
                    let query = 'INSERT INTO EDITOR (S_ID, APPOINTED_DATE) VALUES(?, ?);';
                    connection.query(query, [username, new Date('2000-01-01')], (err, results, fields) => {});
                    return res.json({result: 'success'});
                }
                if (position.includes('contact_author')) {
                    let query = 'INSERT INTO CONTACT_AUTHOR (S_ID) VALUES(?);';
                    connection.query(query, [username], (err, results, fields) => {});
                    return res.json({result: 'success'});
                }
                if (position.includes('author')) {
                    let query = 'INSERT INTO AUTHOR (S_ID) VALUES(?);';
                    connection.query(query, [username], (err, results, fields) => {});
                    return res.json({result: 'success'});
                }
                if (position.includes('reviewer')) {
                    let query = 'INSERT INTO REVIEWER (S_ID, COLLABORATION_DATE, WORK_EMAIL) VALUES(?,?,?);';
                    connection.query(query, [username, new Date('2000-01-01'), 'abc@gmail.com'], (err, results, fields) => {});
                    return res.json({result: 'success'});
                }
            });
    });
});

 router.post('/signin', (req, res)=>{
    const password = req.body.password;
    const username = req.body.username;
    
    var query = 'SELECT ID, HASHED_PASS FROM SCIENTIST '+
    'WHERE ID = ?;';
    connection.query(
        query,
        [username], 
         (err, results, fields)=>{
            if(err) return res.json({result: 'fail', auth: '', token: ''});
            if(results.length == 0) return res.json({result: 'fail', auth: '', token: ''});
            bcrypt.compare(password, results[0].HASHED_PASS,async function(err, result) {
                if(err) return res.json({result: 'fail', auth: '', token: ''});
                if(!result) return res.json({result: 'fail', auth: '', token: ''});

                let authority = await new Promise((resolve, reject) => {connection.query('call get_user_roles(?);', [username] ,(err, res, fields) => {
                    if (err) reject(err);
                    resolve(res);
                })}) 
                let isAuthor = authority[0][0].isAuthor>0;
                let isContactAuthor = authority[0][0].isContactAuthor>0;
                let isReviewer = authority[0][0].isReviewer>0;
                let isEditor = authority[0][0].isEditor>0;
                const token_value = jwt.sign({username:username}, 'JWR-TOKEN-SECRET-SHOULD-BE-STORED-IN-PROCESS-ENV');
                if (isEditor) {
                    res.json({result: 'success', auth: 'editor', token: token_value});
                }     
                else if (isReviewer) {
                    res.json({result: 'success', auth: 'reviewer', token: token_value});
                }   
                else if (isContactAuthor) {
                    res.json({result: 'success', auth: 'contact_author', token: token_value});
                }  
                else {
                    res.json({result: 'success', auth: 'author', token: token_value});
                }       
            });
        });
});

module.exports = router;