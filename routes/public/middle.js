const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require('path');
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;
router.use(express.static('public/'));

router.get('/', (req, res) => {
    res.render('DashBoard');
}) ;

router.get('/dashboard', (req, res) => {
    return res.render('DashBoard');
})

router.use('/editor', (req, res, next) => {

    fetch('http://localhost:3000/authenticate/getAuthorization', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies['authorization']
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.isEditor != 1) {
                res.render('403');
            }
            else {
                next();
            }
        });
}, require('./editor'));


router.use('/reviewer', (req, res, next) => {

    fetch('http://localhost:3000/authenticate/getAuthorization', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies['authorization']
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.isReviewer != 1) {
                res.render('403');
            }
            else {
                next();
            }
        });
}, require('./reviewer'));


router.use('/author', (req, res, next) => {

    fetch('http://localhost:3000/authenticate/getAuthorization', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.cookies['authorization']
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.isAuthor != 1) {
                res.render('403');
            }
            else {
                next();
            }
        });
}, require('./author'));

module.exports = router;