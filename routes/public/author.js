const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');
const { json } = require('body-parser');
fetch.Promise = blueBird;

router.use(express.static('public'));

router.get('/', (req, res) => {
    return res.render('author/DashBoard');
});

module.exports = router;
