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

router.get('/papers', (req, res)=>{
    if(!req.privilege.getPaper) return res.sendStatus(401);

    connection.query(
        'call editor_get_papers(?);',
        [req.user.username],
        (err, results, fieldInfo)=>{
            if(err) return res.status(500).send(err);
            res.send(results);   
        }
    )
});

router.get('/allPapers', (req,res)=>{
    if(!req.privilege.getPaperAll) return res.sendStatus(401);

    connection.query(
        'call editor_get_all_papers();',
        [],
        (err, results, fieldInfo)=>{
            if(err) return res.status(500).send(err);
            res.send(results);
        }
    )
});

module.exports = router;