const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const mysql      = require('mysql');
const saltRounds = 10;

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs_application',
    password : 'nodejs_application_password',
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
    const is_editor = req.body.is_editor;
    const is_reviewer = req.body.is_reviewer;

    bcrypt.hash(password, saltRounds,async function(err, hash) {
        if(err)
            return res.sendStatus(500);
        var create_user_query = 'call create_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        try {
            await new Promise((resolve, reject) => {
                connection.query(
                    create_user_query,
                    [username, fname, address, email, company, job, degree, profession, work_email, is_author, is_reviewer, is_editor],
                    (err, results, fields) => {
                        if (err) reject(err);
                        resolve(res);
                    })
            })
        }
        catch(err) {
            return res.status(400).json({result: 'fail'});
            
        }

        var insert_password_query = 'call insert_password(?,?)';
        connection.query(insert_password_query,
            [username, hash],
            (err, results, fields) => {
                if (err) res.sendStatus(500);
                res.json({result: 'success'});
            })        
    });
});

 router.post('/signin', (req, res)=>{
    const password = req.body.password;
    const username = req.body.username;
    
    connection.query(
        'call get_hashed_password(?);',
        [username], 
         (err, results, fields)=>{
            if(err) return res.status(500).json({result: 'fail', token: ''});           
            if(results.length == 0) return res.json({result: 'fail', token: ''});
            bcrypt.compare(password, results[0][0].hashed_pass, function(err, result) {
                if(err) return res.status(500).json({result: 'fail', token: ''});
                if(!result) return res.status(500).json({result: 'fail', token: ''});
                const token_value = jwt.sign({username:username}, 'JWR-TOKEN-SECRET-SHOULD-BE-STORED-IN-PROCESS-ENV');
                res.json({result: 'success', token: token_value});
            });
        });
});


router.get('/getAuthorization', (req, res) => {
    let username = jwt.decode(req.headers.authorization).username;
    let query = 'call get_user_roles(?)';
    connection.query(query, [username], (err, results, fields) => {
        if (err) res.sendStatus(500);
        // console.log('role: ', results[0][0]);
        return res.json(results[0][0]);
    })
});



module.exports = router;