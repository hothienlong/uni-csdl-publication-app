const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const path = require('path');




router.use('/editor', require('./editor'));
module.exports = router;