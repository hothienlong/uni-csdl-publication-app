const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'author',
    password : 'author_password',
    database : 'publication'
});
connection.connect();


router.post('/write_paper', (req, res)=>{
    if(!req.privilege.paperSubmission) return res.sendStatus(401);

    var p_id = req.body.p_id;
    var title = req.body.title;
    var summary = req.body.summary;
    var associated_file = req.body.associated_file;
    var page_count = req.body.page_count;
    var sent_by = req.body.sent_by;
    var sent_date = req.body.sent_date;

    var query = 'call write_paper(?,?,?,?,?,?,?);';
    connection.query(
        query,
        [p_id, title, summary, associated_file, page_count, sent_by, sent_date], 
        (err, results, fields)=>{
            if (err) return res.status(500).send(err);
        return res.sendStatus(200);
        }
    );
});

module.exports = router;