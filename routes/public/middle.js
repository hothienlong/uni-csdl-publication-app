const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const path = require('path');




router.use('/editor', require('./editor'));
router.use('/contactAuthor', require('./contactAuthor'));
module.exports = router;