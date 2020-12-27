const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');

fetch.Promise = blueBird;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'editor',
    password : 'editor_password',
    database : 'publication'
});
connection.connect();
router.use(express.static('public'));

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
    if(!req.privilege.getPaperAll) {
        return res.sendStatus(401);
    }    
    connection.query(
        'call editor_get_all_papers();',
        [],
        (err, results, fieldInfo)=>{
            //console.log("abc: ",results[0][0]);
            if(err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )    
});


router.get('/allPapersAssigned', (req,res)=>{
    if(!req.privilege.getPaper) {
        return res.sendStatus(401);
    }
    connection.query(
        'call editor_get_papers(?);',
        [req.user],
        (err, results, fieldInfo)=>{
            //console.log("abc: ",results[0][0]);
            if(err) return res.status(500).send(err);
            console.log("result: ", results[0]);
            res.json(results[0]);
        }
    )    
});



router.get('/paper/:paperId', (req, res) => {
    connection.query(
        'call get_paper(?);',
        [req.params.paperId],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.post('/addPaper', (req, res) => {
    // console.log(req.body);
    connection.query(
        'call add_paper(?,?,?,?,?,?,?,?);',
        [req.body.id, req.body.title, req.body.summary, req.body.file, req.body.pagenums, req.body.author, req.body.date, req.body.type_paper],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);
        }
    )
});


router.post('/assignReview', (req, res) => {
    if (!req.privilege.reviewEditorAssignment || !req.privilege.reviewReviewerAssignment){
        return res.sendStatus(401);
    }
    connection.query(
        'call assign_review(?,?,?,?);',
        [req.body.editorId, req.body.reviewerId, req.body.paperId, req.body.reviewDate],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);            
        }
    )
});


router.post('/updatePaperStatus', (req, res) => {
    if (!req.privilege.updateResult) {
        return res.sendStatus(401);
    }
    connection.query(
        'call update_paper_status(?,?);',
        [req.body.paperId, req.body.status],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);            
        }
    )
});


router.post('/updateResultAfterReview', (req, res) => {
    if (!req.privilege.updateResult) {
        return res.sendStatus(401);
    }
    connection.query(
        'call update_result_after_review(?,?,?);',
        [req.body.paperId, req.body.result, req.body.informDate],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.sendStatus(200);            
        }
    )
});



router.get('/getPaperByTypeAndStatus', (req, res) => {
    if(!req.privilege.getPaper) return res.sendStatus(401);
    connection.query(
        'call get_paper_by_type_and_status(?,?);',
        [req.body.typePaper, req.body.statusPaper],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.get('/getPostedPaperByTypeAndYears/:typePaper', (req, res) => {
    if(!req.privilege.getPaper) return res.sendStatus(401);
    connection.query(
        'call get_posted_paper_by_type_and_years(?);',
        [req.body.typePaper, req.body.year],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.get('/getPublishedPaper/:authorId', (req, res) => {
    if(!req.privilege.getPaper) return res.sendStatus(401);
    connection.query(
        'call get_published_paper_by_author(?);',
        [req.params.authorId],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});

router.get('/getPostedPaper/:authorId', (req, res) => {
    if(!req.privilege.getPaper) return res.sendStatus(401);
    connection.query(
        'call get_posted_paper_by_author(?);',
        [req.params.authorId],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.get('/getNumsPaper/:statusPaper', (req, res) => {
    if(!req.privilege.getPaper) return res.sendStatus(401);
    connection.query(
        'call count_paper_by_status(?);',
        [req.params.statusPaper],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});



module.exports = router;