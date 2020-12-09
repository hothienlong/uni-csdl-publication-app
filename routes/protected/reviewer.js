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
        `select (title, summary, associated_file, page_count, sent_by, sent_date) from paper 
            join review_assignment_detail on id = review_assignment_detail.paper_id
            join review_review_assignment on review_assignment_detail.paper_id = review_review_assignment.paper_id
            where review_review_assignment.reviewer_id = ?;
        ;`,
        [req.user.username],
        (err, results, fieldInfo)=>{
            if(err) return res.status(500).send(err);
            res.send(results);   
        }
    )
});

module.exports = router;