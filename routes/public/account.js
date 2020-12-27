const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const mysql      = require('mysql');
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;
const saltRounds = 10;
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'authentication',
    password : 'authentication_password',
    database : 'publication'
});
connection.connect();
var {validationResult, check} = require('express-validator');
const { response } = require('express');

router.use(express.static('public'));
router.get('/signup', (req, res) => {
    return res.render(path.join(__dirname, '../views/signup.ejs'));    
});


router.post('/signup', [check('name').notEmpty().withMessage('Name cannot be empty'),
                        check('username').notEmpty().withMessage('Username cannot be empty'),
                        check('password').isLength({min: 6}).withMessage('Password has to be at least 6 characters'),
                        check('email').isEmail().withMessage('Email is not correct form'),
                        check('position').isLength({min: 1}).withMessage('You must choose 1 position')] , (req, res) => {    

    // const positionArr = req.body.position;
    // let count = 0;
    let err = validationResult(req).array();
    // if (positionArr.includes('editor')) {
    //     positionArr.forEach(element => {
    //         if (['contact_author', 'author'].includes(element)) {
    //             count++;
    //         }
    //     });
            
    //     if (count >= 1) {
    //         err.push({ value: '',
    //             msg: 'Editor, Contact author, Author cannot be choosen at the same time',
    //             param: 'position',
    //             location: 'body' });
    //     }
    // }     
    const alert = err;
    if(alert.length > 0) {
        // return res.status(422).jsonp(errors.array())
        // const alert = errors.array()
        // const alert = errors;
        //console.log(alert);
        res.render('signup', {
            alert
        })
        return;
    }
    // authenticationPanel.hide();
    const password = req.body.password;
    const username = req.body.username;
    const fname = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const company = req.body.company;
    const job = req.body.job;
    const degree = req.body.degree;
    const profession = req.body.profession;
    const position = req.body.position;
    // console.log(position);

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err)
            return res.sendStatus(500);
        let query = 'INSERT INTO SCIENTIST '+
        '(ID, HASHED_PASS, FNAME, ADDRESS, EMAIL, COMPANY, JOB, DEGREE, PROFESSION)'+ 
        'VALUES(?,?,?,?,?,?,?,?,?);';
        connection.query(
            query,
            [username, hash, fname, address, email, company, job, degree, profession], 
            (err, results, fields)=>{
                if(err){
                    const alert = [{ value: username,
                    msg: 'Username already exists!',
                    param: 'username',
                    location: 'body' }];
                    return res.render('signup', {
                        alert
                    })                    
                }
                else {
                    res.redirect('/signin');
                }
                // const token = jwt.sign({username:username}, 'JWR-TOKEN-SECRET-SHOULD-BE-STORED-IN-PROCESS-ENV');                
            });
        if (position.includes('editor')) {
            let query = 'INSERT INTO EDITOR (S_ID, APPOINTED_DATE) VALUES(?, ?);';
            connection.query(query, [username, new Date('2000-01-01')], (err, results, fields) => {});
        }
        if (position.includes('contact_author')) {
            let query = 'INSERT INTO CONTACT_AUTHOR (S_ID) VALUES(?);';
            connection.query(query, [username], (err, results, fields) => {});
        }
        if (position.includes('author')) {
            let query = 'INSERT INTO AUTHOR (S_ID) VALUES(?);';
            connection.query(query, [username], (err, results, fields) => {});
        }
        if (position.includes('reviewer')) {
            let query = 'INSERT INTO REVIEWER (S_ID, COLLABORATION_DATE, WORK_EMAIL) VALUES(?,?,?);';
            connection.query(query, [username, new Date('2000-01-01'), 'abc@gmail.com'], (err, results, fields) => {});
        }
    });       

});

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.post('/signin', [check('username').notEmpty().withMessage('Username cannot be empty'),
                        check('password').notEmpty().withMessage('Password cannot be empty')],
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // return res.status(422).jsonp(errors.array())
            const alert = errors.array()
            // console.log(alert);
            res.render('signin', {
                alert
            })
            return;
        }

        fetch('http://localhost:3000/authenticate/signin', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify(req.body)
        })
            .then(response => response.json())
            .then(result => {
                if (result.result != 'success') {
                    const alert = [{
                        value: '',
                        msg: 'Username or password is not correct',
                        param: 'wrong',
                        location: 'body'
                    }];

                    res.render('signin', {
                        alert
                    });
                    return;                    
                }
                else {
                    if (result.auth == 'editor') {                        
                        res.cookie('authorization', result.token);
                        console.log("editor");
                        return res.redirect('/views/editor');
                    }
                    else if (result.auth == 'reviewer') {                        
                        res.cookie('authorization', result.token);
                        console.log("editor");
                        return res.redirect('/views/reviewer');
                    }
                    else if (result.auth == 'contact_author') {                        
                        res.cookie('authorization', result.token);
                        console.log("contact_author");
                        return res.redirect('/views/contactAuthor');
                    }
                    else if (result.auth == 'author') {                        
                        res.cookie('authorization', result.token);
                        console.log("author");
                        return res.redirect('/views/author');
                    }
                }
            });
    });

module.exports = router