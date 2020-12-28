const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs')
const path = require('path')
const app = express();
var cookieParser = require('cookie-parser');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// var viewsPath = __dirname + '/views/';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// app.use(express.static(__dirname + '/views'));
app.use('/api', require('./routes/protected/protectedRoute'));
app.use('/authenticate', require('./routes/protected/authenticate'));
app.use ('/user', require('./routes/public/account'))
app.use('/views', require('./routes/public/middle'));


app.listen(PORT, ()=>{console.log(`Server has started on port ${PORT}`)})