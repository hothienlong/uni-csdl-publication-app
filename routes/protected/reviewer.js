const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'reviewer',
    password : 'reviewer_password',
    database : 'publication'
});
connection.connect();

router.get('/papers', (req,res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);

    connection.query(
        'call reviewer_get_papers(?);',
        [req.user.username],
        (err, results, fieldInfo)=>{
            if(err) return res.status(500).send(err);
            res.send(results);   
        }
    )
});

module.exports = router;