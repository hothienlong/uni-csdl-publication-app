const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;
const jwt = require("jsonwebtoken");

router.use(express.static('public'));

router.get('/', (req, res) => {
    return res.render('reviewer/DashBoard' , {username: 'I am reviewer'});
});


module.exports = router;