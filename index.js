

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app = express();


const PORT = 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api', require('./routes/protected/protectedRoute'));
app.use('/authenticate', require('./routes/authenticate'));

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(PORT, ()=>{console.log(`Server has started on port ${PORT}`)})