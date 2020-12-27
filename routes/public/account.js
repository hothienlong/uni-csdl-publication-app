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
    return res.render('signup');    
});


router.post('/signup', [check('name').notEmpty().withMessage('Name cannot be empty'),
                        check('username').notEmpty().withMessage('Username cannot be empty'),
                        check('password').isLength({min: 6}).withMessage('Password has to be at least 6 characters'),
                        check('email').isEmail().withMessage('Email is not correct form'),
                        check('position').isLength({min: 1}).withMessage('You must choose 1 position')] , (req, res) => {    
    
    const alert= validationResult(req).array();    
    if(alert.length > 0) {        
        res.render('signup', {
            alert
        })
        return;
    }

    fetch('http://localhost:3000/authenticate/signup', {
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
                        msg: 'Username already exists!',
                        param: 'wrong',
                        location: 'body'
                    }];

                    res.render('signup', {
                        alert
                    });
                    return;                    
                }
                else {
                    res.redirect('/user/signin');
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