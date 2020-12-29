const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = require('node-fetch');
const jwt = require("jsonwebtoken");
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;

var {validationResult, check} = require('express-validator');
const { response } = require('express');

router.use(express.static('public'));
router.get('/signup', (req, res) => {
    return res.render('signup');    
});


router.post('/signup', [check('fname').notEmpty().withMessage('Name cannot be empty'),
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

    if (req.body.position == 'editor') {
        req.body.is_editor = true;
    }
    else if (req.body.position == 'author') {
        req.body.is_author = true;
    }
    else {
        req.body.is_reviewer = true;
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
            })
            .catch(err => console.log("err: ", err));

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
                    res.cookie('authorization', result.token);
                    // let username = jwt.decode(result.token).username;
                    return res.redirect('/views/dashboard');
                }
            });
    });

router.get('/logout', (req, res) => {
    res.clearCookie('authorization');
    res.render('signin');
});

module.exports = router