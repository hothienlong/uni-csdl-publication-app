const { response } = require('express');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const blueBird = require('bluebird');

fetch.Promise = blueBird;
const mysql = require('mysql');
const { resolve, reject } = require('bluebird');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs_application',
    password : 'nodejs_application_password',
    database : 'publication',
    timezone: 'gmt'
});
connection.connect();
router.use(express.static('public'));

router.get('/papers', (req, res)=>{    
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
    connection.query(
        'call editor_get_all_papers();',
        [],
        (err, results, fieldInfo)=>{        
            if(err) return res.status(500).send(err);
            console.log("all papers: ", results[0]);
            res.json(results[0]);
        }
    )    
});


router.get('/allPapersAssigned', (req,res)=>{    
    connection.query(
        'call editor_get_papers(?);',
        [req.user],
        (err, results, fieldInfo)=>{
            //console.log("abc: ",results[0][0]);
            if(err) return res.status(500).send(err);
            console.log("all papers assigned: ", results[0]);
            res.json(results[0]);
        }
    )    
});



router.get('/paper/:paperId', (req, res) => {
    connection.query(
        'call get_paper_by_id(?);',
        [req.params.paperId],
        (err, results, fieldInfo) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("posted: ", results[0]);
            res.json(results[0]);
        }
    )
});

router.get('/authors/:paperId', (req, res) => {
    connection.query(
        'call get_authors_by_paper(?);',
        [req.params.paperId],
        (err, results, fieldInfo) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("authors:/paperId: ", results[0]);
            res.json(results[0]);
        }
    )
});


router.post('/updatePaper',async (req, res) => {        
    await new Promise((resolve, reject) => {
        connection.query(
            'call update_paper(?,?,?,?,?,?);',
            [req.body.id, req.body.title, req.body.summary, req.body.file, req.body.pagenums, req.body.status],
            (err, results, fieldInfo) => {
                if (err){
                    console.log("update paper: ", err);
                    reject(err);
                } 
                resolve(results);
            }
        )
    });    
    let status = req.body.status;
    if (status == 'COMPLETE_REVIEW') {
        connection.query(
            'call update_result_after_review(?,?,?);',
            [req.body.id, req.body.paper_result, req.body.inform_date],
            (err, results, fieldInfo) => {
                if (err) {
                    console.log("update result paper", err);
                    return res.status(500).json(err);
                }
                return res.json({result: 'success'});
            }
        )
    }
    else{
        return res.json({result: 'success'});
    }
});


router.post('/assignReview', (req, res) => {    
    connection.query(
        'call assign_review(?,?,?,?,?);',
        [req.user, req.body.reviewerId, req.body.paperId, req.body.reviewDate, req.body.informDate],
        (err, results, fieldInfo) => {
            if (err){
                console.log('err: ', err);
                return res.status(500).send(err);
            } 
            return res.json({result: 'success'});            
        }
    )
});


router.post('/updatePaperStatus', (req, res) => {    
    connection.query(
        'call update_paper_status(?,?);',
        [req.body.paperId, req.body.status],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            return res.json({result: 'success'});            
        }
    )
});


router.post('/updateResultAfterReview', (req, res) => {    
    connection.query(
        'call update_result_after_review(?,?,?);',
        [req.body.paperId, req.body.result, req.body.informDate],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            return res.json({result: 'success'});            
        }
    )
});



router.get('/getPaperByTypeAndStatus/:typePaper/:statusPaper', (req, res) => {    
    connection.query(
        'call get_paper_by_type_and_status(?,?);',
        [req.params.typePaper, req.params.statusPaper],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.get('/getPostedPaperByTypeAndYears/:typePaper/:distantYear', (req, res) => {    
    connection.query(
        'call get_posted_paper_by_type_and_years(?,?);',
        [req.params.typePaper, parseInt(req.params.distantYear)],
        (err, results, fieldInfo) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("posted: ", results[0]);
            res.json(results[0]);
        }
    )
});


router.get('/getPapersByAuthorAndStatus/:authorId/:statusPaper', (req, res) => {    
    connection.query(
        'call get_papers_by_author_and_status(?,?);',
        [req.params.authorId, req.params.statusPaper],
        (err, results, fieldInfo) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log("posted: ", results[0]);
            res.json(results[0]);
        }
    )
});



router.get('/getPublishedPaper/:authorId', (req, res) => {    
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
    connection.query(
        'call count_paper_by_status(?);',
        [req.params.statusPaper],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.get('/getReviewerByPaper/:paperId', (req, res) => {    
    connection.query(
        'call get_reviewer_by_paper(?)',
        [req.params.paperId],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.get('/getReviewingDetailByPaper/:paperId', (req, res) => {    
    connection.query(
        'call get_reivewing_detail_by_paper(?)',
        [req.params.paperId],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            console.log("date: ", results[0]);
            res.json(results[0]);
        }
    )
});

router.get('/getAllReviewers', (req, res) => {    
    connection.query(
        'call get_all_reviewers()',
        [],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.get('/papersByType', (req, res) => {    
    connection.query(
        'call get_all_reviewers()',
        [],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            res.json(results[0]);
        }
    )
});


router.get('/getAuthors', (req, res) => {    
    connection.query(
        'call get_author()',
        [],
        (err, results, fieldInfo) => {
            if (err) return res.status(500).send(err);
            console.log("date: ", results[0]);
            res.json(results[0]);
        }
    )
});



router.get('/get_profile',(req,res)=> {
    const s_id = req.user

    const query = 'call get_profile_editor(?)'
    connection.query(
        query,
        [s_id],
        (err,results,fields) => {
            if (err) return res.status(500).send(err)
            return res.send(results)
        }
    )
})




router.post('/update_profile', (req,res) => {
    const s_id                  = req.user       
    const fname                 = req.body.fname
    const address               = req.body.address
    const email                 = req.body.email
    const company               = req.body.company
    const job                   = req.body.job
    const degree                = req.body.degree
    const profession            = req.body.profession


    const query = 'call update_information_editor(?,?,?,?,?,?,?,?)'
    connection.query(
        query,
        [s_id,fname,address,email,company,job,degree,profession],
        (err,results,fields) => {
            if (err) return res.status(500).send(err)
            return res.send(results)
        }
    )
})


module.exports = router;