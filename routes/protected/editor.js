const { response } = require('express');
const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'editor',
    password : 'editor_password',
    database : 'publication'
});
connection.connect();

router.post('/createReviewDetail', (req, res)=>{
    if(!req.privilege.reviewInfo) return res.sendStatus(401);

    connection.query(
        'call createReviewDetail(?,?);',
        [req.body.paperId, req.body.reviewDate],
        (err, results, fields)=>{
            if(err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    )
});

router.post('/assignEditor', (req, res)=>{
    if(!req.privilege.reviewEditorAssignment) return res.sendStatus(401);

    connection.query(
        'call assignEditor(?,?);',
        [req.body.paperId, req.body.editorId],
        (err, results, fields)=>{
            if(err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    )
});

router.post('/assignReviewer', (req, res)=>{
    if(!req.privilege.reviewReviewerAssignment) return res.sendStatus(401);

    connection.query(
        'call assignReviewer(?,?);',
        [req.body.paperId, req.body.reviewerId],
        (err, results, fields)=>{
            if(err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    )
});

router.post('/removeEditorAssignment', (req, res)=>{
    if(!req.privilege.reviewEditorAssignment) return res.sendStatus(401);

    connection.query(
        'call removeEditorAssignment(?,?);',
        [req.body.paperId, req.body.editorId],
        (err, results, fields)=>{
            if(err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    )
});

router.post('/removeReviewerAssignment', (req, res)=>{
    if(!req.privilege.reviewReviewerAssignment) return res.sendStatus(401);

    connection.query(
        'call removeReviewerAssignment(?,?);',
        [req.body.paperId, req.body.reviewerId],
        (err, results, fields)=>{
            if(err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    )
});

router.get('/paper', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);

    connection.query(
        `select (title, summary, associated_file, page_count, sent_by, sent_date) from paper 
            join review_assignment_detail on id = review_assignment_detail.paper_id
            join editor_review_assignment on review_assignment_detail.paper_id = review_review_assignment.paper_id
            where editor_review_assignment.editor_id = ?;
        ;`,
        [req.user.username],
        (err, results, fieldInfo)=>{
            if(err) return res.status(500).send(err);
            res.send(results);   
        }
    )
});

router.get('/allPaper', (req,res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);

    connection.query(
        `select (title, summary, associated_file, page_count, sent_by, sent_date) from paper;`,
        [],
        (err, results, fieldInfo)=>{
            if(err) return res.status(500).send(err);
            res.send(results);
        }
    )
});

module.exports = router;